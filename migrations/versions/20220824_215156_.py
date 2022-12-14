"""empty message

Revision ID: a7802bb7a07b
Revises: b3a0c562dd5c
Create Date: 2022-08-24 21:51:56.995173

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a7802bb7a07b'
down_revision = 'b3a0c562dd5c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('chatrooms', 'creator_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('chatrooms', 'receiver_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('chatrooms', 'receiver_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('chatrooms', 'creator_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
