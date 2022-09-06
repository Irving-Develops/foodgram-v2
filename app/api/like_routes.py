from flask import Blueprint, request
from app.models import db, Post
from flask_login import current_user, login_required


like_routes = Blueprint('likes', __name__)

@like_routes.route("/<int:id>/like", methods=["PATCH"])
@login_required
def add_likes(id):
    post = Post.query.get(id)
    post.likes.append(current_user)
    db.session.commit()
    return post.to_dict()


@like_routes.route("/<int:id>/unlike", methods=["PATCH"])
@login_required
def remove_likes(id):
    post = Post.query.get(id)
    post.likes.remove(current_user)
    db.session.commit()
    return post.to_dict()