from flask import Blueprint, request
from app.models import db, User, Pin
from flask_login import login_required, current_user
from datetime import datetime
import app.s3_helpers as s3
from app.forms import PinForm


pin_routes = Blueprint('pin', __name__)


def create_pin(pinForm):
     pin = pinForm.data['pin_file']
     pin.filename = s3.get_unique_filename(pin.filename)
     upload_pin = s3.upload_file_to_s3(pin)
     print(upload_pin)

     upload_pin = {'url': 'No Image'}

     pin_pic = pinForm.data['pin_pic']
     if pin_pic:
          pin_pic.filename = s3.get_unique_filename(pin_pic.filename)
          upload_pin = s3.upload_file_to_s3(pin_pic)

     user = User.query.get(current_user.id)
     new_pin = Pin(
          user = user,
          title = pinForm.data['title'],
          description = pinForm.data['description'],
          user_id = current_user.id,
          pin_link = upload_pin['url']
     )

     db.session.add(new_pin)
     db.session.commit()
     return new_pin


#Get all pins routes
@pin_routes.route('/')
def pins():
     return '<h1>Pins</h1>'


#Get a single pin routes
@pin_routes.route('/<int:id>/')
def single_pin(id):
     pin = Pin.query.get(id)

     return pin.pin_dict()


#Create a pin
@pin_routes.route('/pin-creation-tool/', methods=['POST'])
@login_required
def create_pin_route():
     form = PinForm()
     form['csrf_token'].data = request.cookies['csrf_token']
     if form.validate_on_submit():
          new_pin = create_pin(form)
          return new_pin.pin_dict()

     return {'errors': form.errors}, 401


#Edit a pin by pin id
@pin_routes.route('/<int:id>/', methods=["POST"])
@login_required
def updata_pin(id):
     pin = Pin.query.get(id)

     if not pin:
          return {'errors': 'Pin not found'}, 404

     updated_pin = PinForm()
     updated_pin['csrf_token'].data = request.cookies['csrf_token']
     print('updated pin is: ', updated_pin)

     if updated_pin.validate_on_submit():
          pin.title = updated_pin.title.data
          pin.description = updated_pin.description.data
          pin.pin_link = updated_pin.pin_link.data

          db.session.add(pin)
          db.session.commit()

          return pin.pin_dict()
     return {'errors': updated_pin.errors}, 403


#Delete a pin by id
@pin_routes.route('/<int:id>/', methods=['DELETE'])
@login_required
def delete_pin(id):
     pin = Pin.query.get(id)

     if not pin:
          return {'errors': 'Pin not found'}, 404

     db.session.delete(pin)
     db.session.commit()


     return {'Message': 'Successfully Deleted'}
