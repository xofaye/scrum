# CSC309 Project (*app to be named*)

## Running the application

Install the dependencies.

```bash
npm install
```

Start the MongoDB server
```bash 
mkdir data
mongod --dbpath=$PWD/data
```

Run the app.

```bash
npm start
```

The app will be at `localhost:3000`.

Create admins

First create a regular users, then change their role to 'ADMIN' in the mongodb cmd.

```bash
db.users.update({"_id": ObjectId("id num")}, {$set: {"role":"ADMIN"}})
```
You will need to locate the user's ID first through calling:
```bash
db.users.find().pretty()
```
