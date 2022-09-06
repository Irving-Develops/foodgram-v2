from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError

class ChatroomForm(FlaskForm):
    creator_id = IntegerField('creator_id', validators=[DataRequired()])
    receiver_id = IntegerField('creator_id', validators=[DataRequired()])