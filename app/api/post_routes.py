from flask import Blueprint, request
from app.models import db, Post, User
from flask_login import current_user, login_required
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)


post_routes = Blueprint("posts", __name__)

@post_routes.route("", methods=['GET'])
@login_required
def get_posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route("", methods=["POST"])
@login_required
def upload_post():

    if "img_url" not in request.files:
        return {"errors": "image required"}, 400

    img_url = request.files["img_url"]

    if not allowed_file(img_url.filename):
        return {"errors": "file type not permitted"}, 400
    
    img_url.filename = get_unique_filename(img_url.filename)
    upload = upload_file_to_s3(img_url)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_post = Post(img_url=url, caption=request.form.get('caption'), user_id=current_user.id)
    db.session.add(new_post)
    db.session.commit()
    return new_post.to_dict()


@post_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_post(id):

    post = Post.query.get(id)

    # UPDATE IMAGE CODE IF I WANT TO ADD

    # if "img_url" not in request.files:
    #     return {"errors": "image required"}, 400

    # img_url = request.files["img_url"]

    # if not allowed_file(img_url.filename):
    #     return {"errors": "file type not permitted"}, 400
    
    # img_url.filename = get_unique_filename(img_url.filename)
    # upload = upload_file_to_s3(img_url)

    # if "url" not in upload:
    # # if the dictionary doesn't have a url key
    # # it means that there was an error when we tried to upload
    # # so we send back that error message
    #     return upload, 400

    # url = upload["url"]

    # post.img_url = url

    post.caption = request.form.get('caption')
    db.session.commit()
    return post.to_dict()



@post_routes.route('/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return post.to_dict()