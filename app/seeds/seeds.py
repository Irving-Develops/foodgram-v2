from app.models import db, User, Post, Comment, Chatroom, Message, likes


# Adds a demo user, you can add other users here if you want
def seed_all():
    demo = User(full_name='Demo User', email='demo@aa.io', username='Demo',  password='password')
    marnie = User(full_name= "Marnie McBean", email='marnie@aa.io', username='marnie', password='password')
    bobbie = User(full_name="Bobby Flay", email='bobbie@aa.io', username='bobbie', profile_pic="https://media.vanityfair.com/photos/59f0993d59227820827d16eb/5:3/w_1540,h_924,c_limit/Flay-Iron-Chef-Career.jpg", password='password')
    gramsey = User(full_name="Gordan Ramsey", email="gramsey@gmail.com", username='gramsey', profile_pic="https://www.cleveland.com/resizer/EM8FylOKf-DeFXM12G-rERRtKlU=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/ZWTNX5IO3BGNJJULUGK45TIJDE.jpg", password='password')
    remy = User(full_name="Remy Rata", email="remy@gmail.com", username='cheesetouch', profile_pic="https://i.guim.co.uk/img/media/5d527cef5976c4f21a4adf71929fbcc86b8e0564/280_0_1540_924/master/1540.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67eac7b5ebd3d4ae595364dd33e3eac0", password='password')
    spongebob = User(full_name="Robert Harold SquarePants", email='sbob@gmail.com', username="spongebob", profile_pic="https://assets.nick.com/uri/mgid:arc:imageassetref:nick.com:a625d441-bbbf-42c8-9927-6a0157aac911?quality=0.7", password="password" )

    post1 = Post( img_url="https://houseofyumm.com/wp-content/uploads/2021/01/Birria-de-Res-9.jpg", caption="Had these delicious birria tacos at Los 2 Brothers. Defititely recommend!", user_id=1)
    post2 = Post( img_url="https://preview.redd.it/zg28x4wewll11.jpg?auto=webp&s=22dbcb27dfa245c9c4a40e814870cdc529701dee", caption="Amazing night out at Sushi Saito. It was incredible watching Chef Takashi Saito prepare our courses in front of us!", user_id= 2)
    post3 = Post( img_url="https://static.wixstatic.com/media/5eff48_3a2809aa29a246c1a46a7dad27028386~mv2.jpg/v1/fit/w_960%2Ch_960%2Cal_c%2Cq_80/file.jpg", caption="Breakfast in Egypt", user_id= 3)
    post4 = Post( img_url="https://media-cdn.tripadvisor.com/media/photo-s/1a/c6/8f/86/photo1jpg.jpg", caption="Worth the hype", user_id=4)
    post5 = Post( img_url="https://pbs.twimg.com/media/EEWAgVKXkAAipgt.jpg:large", caption="They told me only one drink 🤣", user_id=5)
    post6 = Post( img_url="http://smallcakesslw.com/wp-content/uploads/2019/04/bubble-waffle-.jpeg", caption="All three for me", user_id=6)
    post7= Post( img_url="https://www.icegif.com/wp-content/uploads/spongebob-squarepants-krabby-patty.gif", user_id=6)
    post8 = Post( img_url="https://media.tenor.com/mtD9CjQ5HRgAAAAC/spaghetti-ratatouille.gif", caption="Me cooking pasta", user_id=5)
    post9 = Post( img_url="https://i.pinimg.com/originals/4e/ed/a5/4eeda5d87b49025498ee5166e7aff4e4.jpg", user_id=2)
    # post10 = Post( img_url=, caption=, user_id=)
    # post11 = Post( img_url=, caption=, user_id=)
    # post12 = Post( img_url=, caption=, user_id=)
    # post13 = Post( img_url=, caption=, user_id=)
    # post14 = Post( img_url=, caption=, user_id=)

    comment1 = Comment(comment_text="Those tacos are so good!", user_id=2, post_id=1)
    comment2 = Comment(comment_text="How long to get a reservation? I heard it was over two years!!", user_id=1, post_id=2)
    comment3 = Comment(comment_text="Where is this?", user_id=1, post_id=3)

    chatroom1 = Chatroom(creator_id=2, receiver_id=1)
    chatroom2 = Chatroom(creator_id=2, receiver_id=3)
    
    message1 = Message(message="hi", owner_id=2, chatroom_id=1)
    message2 = Message(message="hi", owner_id=2, chatroom_id=2)
    message3 = Message(message="hey demo, how's it going", owner_id=1, chatroom_id=1)
    message4 = Message(message="whats up?", owner_id=3, chatroom_id=2)

    post1.likes.append(demo)
    post1.likes.append(marnie)
    post1.likes.append(bobbie)
    post2.likes.append(demo)
    post2.likes.append(marnie)
    post2.likes.append(bobbie)
    post3.likes.append(demo)
    post3.likes.append(marnie)
    post3.likes.append(bobbie)
    post4.likes.append(gramsey)
    post4.likes.append(demo)
    post4.likes.append(bobbie)
    post4.likes.append(marnie)
    post4.likes.append(remy)
    post5.likes.append(spongebob)
    post5.likes.append(gramsey)
    post6.likes.append(demo)
    post6.likes.append(bobbie)
    post6.likes.append(remy)
    post7.likes.append(bobbie)
    post7.likes.append(marnie)

    demo.followed.append(marnie)
    marnie.followed.append(bobbie)
    bobbie.followed.append(demo)
    bobbie.followed.append(marnie)
    



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(gramsey)
    db.session.add(remy)
    db.session.add(spongebob)
    db.session.commit()
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.commit()

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(chatroom1)
    db.session.add(chatroom2)
    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_all():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
