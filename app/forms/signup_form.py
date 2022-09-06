from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def full_name_length(form, field):
    full_name = field.data

    if len(full_name) > 50:
        raise ValidationError('Full Name cannot be longer than 50 characters')
    if len(full_name) < 4:
        raise ValidationError('Full Name must be longer than 4 characters')

def username_length(form, field):
    username = field.data
    if len(username) > 50:
        raise ValidationError('Username cannot be longer than 50 characters')
    
def email_length(form, field):
    email = field.data
    if len(email) < 6:
        raise ValidationError('Email must be longer than 6 characters')
    if len(email) > 255:
        raise ValidationError('Email cannot be longer than 255 characters')

class SignUpForm(FlaskForm):
    full_name = StringField('full name', validators=[DataRequired(), full_name_length])
    username = StringField('username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), user_exists, email_length])
    profile_pic = StringField('profile picture')
    password = StringField('password', validators=[DataRequired()])
