# Welcome to Foodgram

[Foodgram](https://fooodgram.herokuapp.com/) is a fullstack clone of the popular website/app: Instagram. Like the name suggests, Foodgram has the same functionality but with a food twist. My website is catered towards people who enjoy sharing images of their food and all things related.  Checkout out Foodgram [here](https://fooodgram.herokuapp.com/)!

I chose to create foodgram as a way to challenge myself. After realizing the disadvantages of storing images in a database table, I wanted to learn how to use AWS S3 Buckets to store user's images. S3 allows me to store images safely and without fearing database issues. 

## Technologies used

Foodgram's backend was created with Flask and Python, while the frontend was created with React and Redux.

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Amazon S3](https://img.shields.io/badge/-Amazon%20S3-569A31?logo=amazons3&logoColor=white&style=for-the-badge)

## Features
* [Posts](https://github.com/Irving-Develops/foodgram/wiki/MVP-Feature-List#imagesposts)
* [Comments](https://github.com/Irving-Develops/foodgram/wiki/MVP-Feature-List#commenting-on-posts)

## Landing Page
<img width="1096" alt="Screen Shot 2022-08-09 at 12 18 01 PM" src="https://user-images.githubusercontent.com/96028000/183940833-3577b70c-b33f-4fc0-acb5-2de2d69d41c4.png">

## Home Page

<img width="913" alt="Screen Shot 2022-08-10 at 10 08 56 AM" src="https://user-images.githubusercontent.com/96028000/183940959-6d15934f-4e69-44d5-8c5f-056f6df274db.png">

## Feature Modals

Modals are used heavily on Instagram, 

### Creating a post

<img width="733" alt="Screen Shot 2022-08-10 at 10 09 24 AM" src="https://user-images.githubusercontent.com/96028000/183941980-dc14f9af-a1de-412d-ae11-20af206900f5.png">

### Editing the caption on your post

<img width="1095" alt="Screen Shot 2022-08-10 at 10 10 19 AM" src="https://user-images.githubusercontent.com/96028000/183942150-21377902-db07-443f-9de8-1634a9c4e773.png">


## Editing your comment

<img width="1139" alt="Screen Shot 2022-08-10 at 10 15 34 AM" src="https://user-images.githubusercontent.com/96028000/183942187-31da6cac-c117-4bf8-9ae4-d15887c054c4.png">


## Deleting your post or your comments

<img width="840" alt="Screen Shot 2022-08-10 at 10 17 27 AM" src="https://user-images.githubusercontent.com/96028000/183942205-bc404412-c2bf-4ca8-976b-839ecf2d5fb0.png">


# Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on alpine-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

### Dev Containers (OPTIONAL for M1 Users)
The following instructions detail an *optional* development setup for M1 Mac users having issues with the `psycopg` package.

1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed. 
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer. 
3. Clone the repository (only this branch)
   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```
4. Open the repo in VS Code. 
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner. 
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app. You do not need a `DATABASE_URL` in the `.env` file if you are using this Docker setup for development - the URL is already set in the image (see `.devcontainer/Dockerfile` for the URL).

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ``` 

9. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

<br>
