from flask import Blueprint, jsonify, session, request
from app.models import Comment, db
from app.forms import CommentForm
from flask_login import current_user, login_user, logout_user, login_required


comment_routes = Blueprint('comments', __name__)

@comment_routes.route("", methods=['GET'])
@login_required
def get_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

# @comment_routes.route("/<int:id>", methods=['GET'])
# @login_required
# def get_comments_of_posts(id):
#     comments = Comment.query.filter(Comment.post_id == id).all()
#     return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route("", methods=['POST'])
@login_required
def add_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            comment_text=form.data['comment_text'],
            user_id=form.data['user_id'],
            post_id=form.data['post_id']
        )

        # new_comment = Comment(comment_text=request.form.get("comment_text", post_id=request.form.get("post_id"), user_id=current_user))
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return { 'errors' : validation_errors_to_error_messages(form.errors) }, 400



@comment_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_comment(id):
    comment = Comment.query.get(id)
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment_text = form.data['comment_text']
    
        db.session.commit()
        return comment.to_dict()
    return { 'errors' : validation_errors_to_error_messages(form.errors) }, 400
    

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()