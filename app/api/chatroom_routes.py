from flask import Blueprint, jsonify, session, request
from app.models import Chatroom, db
from app.forms import ChatroomForm
from flask_login import current_user, login_user, logout_user, login_required

chatroom_routes = Blueprint('chatrooms', __name__)


@chatroom_routes.route("", methods=['GET'])
@login_required
def get_chatrooms():
    chatrooms = Chatroom.query.all()
    return {'chatrooms': [chatroom.to_dict() for chatroom in chatrooms]}

@chatroom_routes.route("", methods=['POST'])
@login_required
def add_chatrooms():
    print("POSTED IN ROUTE")
    form = ChatroomForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        chatroom = Chatroom(
            creator_id=form.data['creator_id'],
            receiver_id=form.data['receiver_id']
        )

        db.session.add(chatroom)
        db.session.commit()
        return chatroom.to_dict()
    return { 'errors' : validation_errors_to_error_messages(form.errors) }, 400