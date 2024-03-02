from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
     __tablename__ = 'comments'

     if environment == "production":
          __table_args__ = {'schema': SCHEMA}

     id = db.Column(db.Integer, primary_key=True)
     comment = db.Column(db.Text, nullable=False)
     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
     pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')), nullable=False)
     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
     updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())


     pin = db.relationship(
          'Pin',
          back_populates='comments_pin',
          cascade="all, delete"
     )

     user_comment = db.relationship(
          'User',
          back_populates='comments_user',
          cascade="all, delete"
     )
