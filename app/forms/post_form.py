from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def caption_length(form, field):
    caption = form.data
    if len(caption) > 255:
        raise ValidationError('Caption cannot be longer than 255 characters')


class PostForm(FlaskForm):
    img_url = StringField('image url', validators=[DataRequired()])
    caption = StringField('caption', validators=[caption_length])