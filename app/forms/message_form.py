from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class MessageForm(FlaskForm):
    message = StringField('message', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    chatroom_id = IntegerField('chatroom_id', validators=[DataRequired()])