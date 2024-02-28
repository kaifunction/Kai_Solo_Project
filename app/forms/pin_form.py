from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired
from ..s3_helpers import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed


class PinForm(FlaskForm):
     title = StringField('Title', validators=[DataRequired(message='Title is required')])
     pin_link = FileField('Pin', validators=[FileAllowed(ALLOWED_EXTENSIONS)])
