from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from datetime import datetime as dt


def is_before_today(_form, field):
    if not field:
        return
    if (dt.strptime(field.data, "%Y-%m-%d") - dt.now()).total_seconds() > 0:
        raise ValidationError("Date must be before today.")


class BoardForm(FlaskForm):
     title = StringField('title', validators=[DataRequired()])
     board_pic = StringField('board_pic')
     description = StringField('description')
     pins = StringField('pins')
     created_at = StringField('created_at', validators=[is_before_today])
