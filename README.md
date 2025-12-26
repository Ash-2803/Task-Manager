Task Manager CLI App (Node.js)

A simple command-line based Task Manager built using Node.js and the File System (fs) module.
It allows users to manage daily tasks directly from the terminal with persistent storage using a JSON file.

🚀 Features

Add new tasks

Prevent duplicate tasks

List all tasks

Filter tasks by status (done / pending)

Mark tasks as completed

Undo task completion

Delete tasks

Search tasks by keyword

Persistent storage using tasks.json

🛠️ Tech Stack

Node.js

JavaScript

File System (fs) module

JSON for data storage

📁 Project Structure
Task Manager/
│
├── app.js          # Main application logic
├── tasks.json      # Stores tasks data
├── package.json    # Project metadata
└── README.md       # Project documentation

⚙️ Installation & Setup

Clone the repository:

git clone <your-repo-url>


Navigate into the project directory:

cd task-manager


Make sure Node.js is installed:

node -v


Run the app:

node app.js

📌 Usage Commands
➕ Add a Task
node app.js add "Your task here"

📋 List All Tasks
node app.js list

📋 List Completed Tasks
node app.js list done

📋 List Pending Tasks
node app.js list pending

✅ Mark Task as Done
node app.js done <task-number>

↩️ Undo Task Status
node app.js undo <task-number>

❌ Delete a Task
node app.js delete <task-number>

🔍 Search Tasks
node app.js search <keyword>

📦 Data Format (tasks.json)

Each task is stored in the following format:

{
  "id": 1766602511065,
  "text": "Sample Task",
  "completed": false,
  "createdAt": "2025-12-24T18:55:11.065Z"
}

🔒 Duplicate Task Protection

The app prevents adding duplicate tasks

Comparison is case-insensitive

Leading/trailing spaces are trimmed

🧠 Learning Outcomes

Working with process.argv

File read/write operations in Node.js

JSON parsing and formatting

Command-line app design

Input validation

Basic CRUD operations

Git & GitHub workflow

📌 Future Improvements

Edit task text

Clear all completed tasks

Sort tasks by date

Convert into an Express API

Add colored CLI UI with libraries like chalk

Add unit tests

👤 Author

Ash
Beginner-friendly Node.js project focused on learning real-world CLI application development.
