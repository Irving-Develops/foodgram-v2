from flask_socketio import SocketIO, emit
from app.models import Message, db
from app.api.message_routes import add_message
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://actual-app-url.herokuapp.com',
        'https://actual-app-url.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
# socketio = SocketIO(cors_allowed_origins=origins)
socketio = SocketIO(cors_allowed_origins='*', logger=True, engineio_logger=True)

current_messages = []
# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    current_messages.append(data)
    emit("chat", data, broadcast=True)



# @socketio.on("disconnect")
# def handle_disconnet():
#     for msg in current_messages:
#         print(msg, "message in socket disconnect \n")
#         add_message(msg)
#         # new_msg = Message(
#         #     message=msg.message,
#         #     chatroom_id=msg.chatroom_id,
#         #     message=msg.owner_id
#         # )
#         # print(new_msg, "new message in disconnect \n")
#         # db.session.add(new_msg)
#         # db.session.commit()
#     pass


print(current_messages, "current messages")
# print(Message, "here")


# @socketio.on("delete")
# def delete_message(message):
#     emit("delete", message, broadcast=True)
