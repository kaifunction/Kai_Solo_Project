from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Board, User, Pin
from app.forms import BoardForm
from datetime import datetime as dt
from app.s3_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename


board_routes = Blueprint('boards', __name__)

# GET all boards
@board_routes.route('/')
def all_board():
     boards = Board.query.all()
     # print('BOARDS:================> ', boards)
     return {
          'boards': [board.toDictLimited() for board in boards]
     }


# GET a single board
@board_routes.route('/<int:id>/')
def get_board(id):
    board = Board.query.get(id)
    return {
        "board": board.to_dict()
    }


# POST a new board
@board_routes.route('/', methods=['POST'])
@login_required
def create_board():
     user = User.query.get(current_user.id)

     form = BoardForm()
     form['csrf_token'].data = request.cookies['csrf_token']
     if form.validate_on_submit():
          pinStr = form.data['pins']
          pins = []
          for pinId in pinStr.split(','):
               pins.append(Pin.query.get(pinId))

          board = Board(
               title=form.data['title'],
               board_pic=form.data['board_pic'],
               description=form.data['description'],
               user=user,
               pins=pins,
               # created_at=dt.now(),
               # updated_at=dt.now()
          )
          db.session.add(board)
          db.session.commit()
          return { 'board': board.to_dict() }, 200
     return {'errors': form.errors}, 401


# Edit a board
@board_routes.route('/<int:id>/', methods=['POST'])
@login_required
def edit_board(id):
     user = User.query.get(current_user.id)
     board = Board.query.get(id)

     if user.id != board.user.id:
          return { 'message': 'Forbidden.' }, 403


     form = BoardForm()
     form['csrf_token'].data = request.cookies['csrf_token']
     if form.validate_on_submit():
          board.title = form.data['title'] or board.title
          board.board_pic=form.data['board_pic'] or board.board_pic
          board.description = form.data['description'] or board.description
          board.user = user
          board.pins = board.pins

          db.session.add(board)
          db.session.commit()
          return { 'board': board.to_dict() }, 200
     return {'errors': form.errors}, 401



# Delete a board
@board_routes.route('/<int:id>/', methods=['DELETE'])
@login_required
def delete_board(id):
     user = User.query.get(current_user.id)
     board = Board.query.get(id)

     if user.id != board.user.id:
          return { 'message': 'Forbidden.' }, 403

     if board.board_pic:
          remove_file_from_s3(board.board_pic)

     for pin in board.pins:
          if board.board_pic:
               remove_file_from_s3(pin.pin_link)
          remove_file_from_s3(pin.pin_link)


     db.session.delete(board)
     db.session.commit()
     return { 'message': 'Board deleted.' }, 200
