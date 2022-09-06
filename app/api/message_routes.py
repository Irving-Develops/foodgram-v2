from flask import Blueprint, jsonify, session, request
from app.models import Message, db
from app.forms import MessageForm
from flask_login import current_user, login_user, logout_user, login_required


message_routes = Blueprint("messages", __name__)

@message_routes.route("/<int:id>", methods=['GET'])
@login_required
def get_messages(id):
    print("inside route")
    messages = Message.query.filter(Message.chatroom_id == id)
    return {'message': [message.to_dict() for message in messages]}


@message_routes.route("", methods=["POST"])
@login_required
def add_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data['chatroom_id'], "\n \n")
    if form.validate_on_submit():
        message = Message(
            message=form.data['message'],
            chatroom_id=form.data['chatroom_id'],
            owner_id=form.data['owner_id'],
        )

        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    return { 'errors' : validation_errors_to_error_messages(form.errors) }, 400
    

@message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_message(id):
    message = Message.query.get(id)
    db.session.delete(message)
    db.session.commit()
    return message.to_dict()