# Scrum

## Welcome to Scrum
We're a group of three University of Toronto students in Computer Science who are passionate about helping you find your love for recreational sports again. Staying active and participating in team sports has numerous physical, social and psychological benefits. You can use Scrum to browse for recreational sporting events based on activity type, location and date. If you can't find an event you're interested in, then we encourage all users to create their own event! Scrum has built-in RSVP and commenting functionality to facilitate the event planning process. 

## Navigating the application

All users are required to register for an account before they are able to search or create any sports listings. The register button can be found in the navigator at the top of the page, or at the bottom of the home page.

### Dashboard

![Dashboard](https://github.com/xofaye/scrum/blob/master/screenshots/Dashboard.jpg)
This is where you will see all the upcoming sports events, and be able to search for events of your particular liking: By sport, location and/or date.You can also navigate to the User Search page for finding a particular user.


### Events

![Events Page](https://github.com/xofaye/scrum/blob/master/screenshots/Events.jpg)
On the Events page is where you are able to RSVP, Comment, and see all the other applicable information regarding the event. This includes: the organizer, date / time, location and the attendees that are already attending. Users are able RSVP to the event if the event still requires a number of attendees. If Users are already RSVP'd and they decide that they cannot attend any longer, they are easily able to un-RSVP by clicking the "Can't Go" button. Of course, they are able to RSVP again if spots are still available.


**Commenting**

Comments are available at the bottom of the events page. Users are able to add comments and delete any previous comments they may have made.


**Creating an Event**

![create an event](https://github.com/xofaye/scrum/blob/master/screenshots/Create_an_Event.jpg)
Any user is able to create an event. The "Create an Event" button is located in the navigation bar where on click, you will be taken to the Create an Event Page. Simply fill out the form with the required information and then hit "Submit" to create the event. Once the event is created, the user is able to edit it's information using the "Edit" button on the event page. Users are also able to cancel the event entirely and "Delete" it. 


### User Profile

![Users Profile Page](https://github.com/xofaye/scrum/blob/master/screenshots/User_Profile.jpg)
On the Users Profile page, users are able to view their information, the events they've created and the events they've RSVP'd to. Users can also edit their personal information and change their password using the "Edit Profile" button located on the upper right side of the screen. Users can also choose to Delete their accounts if they decide they no longer want to participate in any events.


### Admin Functions

Admins are able to Edit and Delete any User, Event and/or Comment. They are also able to promote other users to Admins through the "Promote to Admin" button which is located on the User Profile page of the user.


## Running the application locally

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

## Creating admins

First create a regular user throught the web application interface. Then change their role to 'ADMIN' in the mongodb cmd.

```bash
db.users.update({"_id": ObjectId("id num")}, {$set: {"role":"ADMIN"}})
```
You will need to locate the user's ID first through calling:
```bash
db.users.find().pretty()
```

## Credits

* Big thanks to [SweetAlert](https://github.com/t4t5/sweetalert) for providing the sweet alerts.
* Thanks to [Freepik](http://www.freepik.com) for the sports and avator vectors 
* Photos from [Unsplash](http://www.unsplash.com) 
