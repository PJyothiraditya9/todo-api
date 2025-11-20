Todo API

A simple Node.js and Express REST API to manage todo items.
Data is stored in a local JSON file (todos.json).
The API is deployed on Render.

Features

• Create todos
• Get all todos
• Update todo title or completed status
• Delete todos
• Input validation for clean requests
• CORS enabled
• Uses Render dynamic port for deployment
• Lightweight and beginner friendly

Folder Structure
backend/
│
├── index.js        # Main server file
├── todos.json      # JSON data store
├── package.json    # Dependencies and scripts
├── .gitignore      # Ignored files
└── README.md       # Documentation

Installation

Install dependencies.

npm install


Start the server locally.

npm start


Server runs on:

http://localhost:3000

API Endpoints
GET /todos

Fetch all todos.

Example:

GET /todos

POST /todos

Create a new todo.

Body JSON:

{
  "title": "Buy milk"
}


Response:

201 Created

PUT /todos/:id

Update todo title or completed value.

Body JSON:

{
  "completed": true
}

DELETE /todos/:id

Delete a todo by ID.

Response:

200 OK

Deployment (Render)

The API automatically binds to Render’s assigned port.

const PORT = process.env.PORT || 3000;


Build command:

npm install


Start command:

npm start


Stored todos reset on each deploy because Render free tier does not support persistent storage.

Technologies Used

• Node.js
• Express
• JSON file storage
• CORS
• Render (deployment)