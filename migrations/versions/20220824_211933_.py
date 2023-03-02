"""empty message

Revision ID: 11ffc0c93e6f
Revises: 0b1133e023a0
Create Date: 2022-08-24 21:19:33.530999

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '11ffc0c93e6f'
down_revision = '0b1133e023a0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('chatrooms', sa.Column('receiver_id', sa.Integer(), nullable=False))
    op.drop_constraint('chatrooms_creator_id_fkey', 'chatrooms', type_='foreignkey')
    op.drop_constraint('chatrooms_recipient_id_fkey', 'chatrooms', type_='foreignkey')
    op.create_foreign_key(None, 'chatrooms', 'users', ['receiver_id'], ['id'])
    op.drop_column('chatrooms', 'creator_id')
    op.drop_column('chatrooms', 'recipient_id')
    # ### end Alembic commands ###
    # if environment == "production":
    #     op.execute(f"ALTER TABLE _name> SET SCHEMA {SCHEMA};")



def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('chatrooms', sa.Column('recipient_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('chatrooms', sa.Column('creator_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'chatrooms', type_='foreignkey')
    op.create_foreign_key('chatrooms_recipient_id_fkey', 'chatrooms', 'users', ['recipient_id'], ['id'])
    op.create_foreign_key('chatrooms_creator_id_fkey', 'chatrooms', 'users', ['creator_id'], ['id'])
    op.drop_column('chatrooms', 'receiver_id')
    # ### end Alembic commands ###
