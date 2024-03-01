from flask import Blueprint, request, render_template, jsonify
from app.models import db, User, Pin
from flask_login import login_required, current_user
from datetime import datetime
from app.s3_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from app.forms import PinForm


pin_routes = Blueprint('pin', __name__)


# def create_pin(pinForm):
#      pin = pinForm.data['pin']

#      pin.filename = get_unique_filename(pin.filename)
#      upload_pin = upload_file_to_s3(pin)
#      print(upload_pin)

#      upload_pic = {"url": "No Image"}

#      pin_pic = pinForm.data['pin_pic']
#      if pin_pic:
#           pin_pic.filename = get_unique_filename(pin_pic.filename)
#           upload_pic = upload_file_to_s3(pin_pic)

#      user = User.query.get(current_user.id)
#      new_pin = Pin(
#           user = user,
#           title = pinForm.data['title'],
#           description = pinForm.data['description'],
#           user_id = current_user.id,
#           pin_link = upload_pin['url']
#      )

#      db.session.add(new_pin)
#      db.session.commit()
#      return new_pin


#Get all pins routes
@pin_routes.route('/')
def pins():
     pins = Pin.query.all()
     # print(pins)
     # return pins.pin_dict()
     return {pin.id:pin.pin_dict() for pin in pins}


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

     print("FORM DATA FROM PIN ROUTE===>", form.data)
     if form.validate_on_submit():
          pin_link = form.data['pin_link']
          pin_link.filename = get_unique_filename(pin_link.filename)
          upload = upload_file_to_s3(pin_link)
          print(upload)

          if 'url' not in upload:
               return render_template("post_form.html", form=form, errors=[upload])
          url = ''
          if upload:
               url = upload['url']
          new_pin = Pin(
               user=current_user,
               title=form.data['title'],
               pin_link=url,
               description=form.data['description']
          )
          db.session.add(new_pin)
          db.session.commit()

          return jsonify(new_pin.pin_dict()), 201

     return jsonify({'errors': form.errors}), 400


#Edit a pin by pin id
@pin_routes.route('/<int:id>/edit/', methods=["POST"])
@login_required
def updata_pin(id):
     pin = Pin.query.get(id)

     if not pin:
          return {'errors': 'Pin not found'}, 404

     updated_pin = PinForm()
     updated_pin['csrf_token'].data = request.cookies['csrf_token']
     #=======> <========#
     print('updated pin is: ', updated_pin)
     if updated_pin.validate_on_submit():
          pin_link = updated_pin.data['pin_link']
          pin_link.filename = get_unique_filename(pin_link.filename)
          upload = upload_file_to_s3(pin_link)

          if 'url' not in upload:
               return render_template("post_form.html", form=updated_pin, errors=[upload])
          url = ''
          if upload:
               url = upload['url']

          pin.title = updated_pin.data['title']
          pin.pin_link = url
          pin.description = updated_pin.data['description']
          # new_pin = Pin(
          #      user=current_user,
          #      title=updated_pin.data['title'],
          #      pin_link=url,
          #      description=updated_pin.data['description']
          # )

     # if updated_pin.validate_on_submit():
     #      pin.title = updated_pin.title.data
     #      pin.description = updated_pin.description.data
     #      pin.pin_link = updated_pin.pin_link.data

          # db.session.add(new_pin)
          db.session.commit()

          return jsonify(pin.pin_dict()), 201
     return jsonify({'errors': updated_pin.errors}), 403


#Delete a pin by id
@pin_routes.route('/<int:id>/', methods=['DELETE'])
# @login_required
def delete_pin(id):
     pin = Pin.query.get(id)

     if not pin:
          return {'errors': 'Pin not found'}, 404

     db.session.delete(pin)
     db.session.commit()


     return {'Message': 'Successfully Deleted'}
