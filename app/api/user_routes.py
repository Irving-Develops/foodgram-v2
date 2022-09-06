from flask import Blueprint, jsonify, request, redirect, url_for
from app.forms import EmptyForm
from flask_login import login_required, current_user
from app.models import db, User
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route("/<int:id>", methods=['PUT'])
@login_required
def edit_user(id):
    print("INSIDE USER PUT ROUTE \n \n")
    user = User.query.get(id)



    if "profile_pic" not in request.files:
        return {"errors": "image required"}, 400

    profile_pic = request.files["profile_pic"]

    if not allowed_file(profile_pic.filename):
        return {"errors": "file type not permitted"}, 400
    
    profile_pic.filename = get_unique_filename(profile_pic.filename)
    upload = upload_file_to_s3(profile_pic)

    if "url" not in upload:
    # if the dictionary doesn't have a url key
    # it means that there was an error when we tried to upload
    # so we send back that error message
        return upload, 400

    url = upload["url"]


    user.profile_pic = url
    db.session.commit()
    return user.to_dict()


@user_routes.route('/follow/<int:id>', methods=['PATCH'])
@login_required
def follow(id):
    user = User.query.get(id)
    current_user.follow(user)
    db.session.commit()
    return user.to_dict()


@user_routes.route('/unfollow/<int:id>', methods=['PATCH'])
@login_required
def unfollow(id):
    user = User.query.get(id)
    current_user.unfollow(user)
    db.session.commit()
    return user.to_dict()