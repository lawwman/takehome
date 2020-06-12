# Take home assignment from GovTech

This application is built with the MERN stack - MongoDB, ExpressJS, ReactJS and NodeJS.

I chose to use the ReactJS libary because I wanted to create a dashboard that is very responsive and shows results of user in real time without having
to refresh the page.

I'm more familiar with Express so I used that to set up the server side logic.

Given another chance, I might go with PostgreSQL. MongoDB does not have good support for transactions, which on hindsight, feels like a better approach.


# To install and setup
Make sure the machine has mongodb installed.

After cloning the project, you can install the node packages for the server side with `npm install`. Then run `npm run client-install` to install the node packages for the client side.

To run the application, use `npm run dev`, which will concurrently run both the server side and client side servers at the same time. The client side has a proxy set to route to server side.


