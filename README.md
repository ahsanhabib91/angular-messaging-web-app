# Angular Messaging Web App

This is a reusable Angular project that can handle private messages between Users implemented with `Angular 4`, `Material UI` and `Bootstrap`. The back-end of this project is implement with `Python 3`, `Django Rest Framework` and `PostgreSQL` which can be found in this [repository](https://github.com/ahsanhabib91/django-messaging-web-app).

## Features

*  	User `Registration`.
*  	User `Login` and `Logout`.
*  	A User is allowed to have different Conversations with another User.
*  	A User can `Archive` a Conversation.
*  	A User can `Delete` a Conversation.
*  	User can see `sorted Conversation list` where his last Conversation shows up with `timestamp`.
*  	User can see `message list` with `timestamp` related to a particular `Conversation` sorted by `timestamp`.
*	User can send `messages` and `photos` to another User and maintaina a seperate `Conversation thread`.

## Installation

*	`git clone https://github.com/ahsanhabib91/angular-messaging-web-app.git`.
*	`cd angular-messaging-web-app`.
*	`npm install`.
*	Please, update `angular-messaging-web-app/src/app/services/auth.service.ts` file with proper `Ip address` and `port number` of back-end.
*	`ng serve`.