// const { log } = require("console");
const fs = require("fs");

console.log("Task Manager App started");

const command = process.argv[2];
const taskText = process.argv[3];

if (!command) {
  console.log("Please provide a command");
  return;
}
// Reading the tasks.json
fs.readFile("tasks.json", "utf-8", (err, data) => {
  let tasks = [];
  if (!err && data) {
    try {
      tasks = JSON.parse(data);
    } catch {
      tasks = [];
    }
  }
  // Add Command
  if (command === "add") {
    if (!taskText || taskText.toLowerCase() === "add") {
      console.log("Please provide a valid task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    // Prevent adding duplicate tasks
    const isDuplicate = tasks.filter(
      (task) =>
        task.text.toLowerCase().trim() === taskText.toLocaleLowerCase().trim()
    );
    if (isDuplicate.length > 0) {
      console.log(`The given task already exist in the Task`);
      return;
    } else {
      tasks.push(newTask);
    }

    // Writing in the tasks,json
    fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        console.log("Error saving task");
        return;
      }

      console.log(`Task added: ${taskText}`);
      console.log(`Total tasks: ${tasks.length}`);
    });
    // list command
  } else if (command === "list") {
    if (tasks.length === 0) {
      return;
    }
    console.log("Tasks:");
    tasks.forEach((item, index) => {
      // Using Colors 
      const GREEN = "\x1b[32m"; 
      const YELLOW = "\x1b[33m";
      const RESET = "\x1b[0m";
      if (taskText === "done" && item.completed === true) {
        console.log(`${GREEN}${index + 1}. ${item.text} [Done]${RESET}`);
      } else if (taskText === "pending" && item.completed === false) {
        console.log(`${YELLOW}${index + 1}. ${item.text} [Pending]${RESET}`);
      } else if (!taskText) {
        console.log(
          `${index + 1}.${item.text} [${item.completed ? "Done" : "Pending"}]`
        );
      }
    });
    // deleting the tasks
  } else if (command === "delete") {
    const number = parseInt(taskText);
    if (isNaN(number)) {
      return;
    } else if (number < 1 || number > tasks.length) {
      return;
    }
    tasks.splice(number - 1, 1);
    console.log("Task has been deleted");
    fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        console.log("Error saving task");
        return;
      }
    });
    // done
  } else if (command === "done") {
    const number = parseInt(taskText);
    if (isNaN(number)) {
      console.log("Enter a valid number to Make this task done");
      return;
    } else if (number < 1 || number > tasks.length) {
      console.log("Invalid number for completed Task ");
      return;
    }
    tasks[number - 1].completed = true;
    console.log("Task completed Successfully");
    fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        console.log("Error saving task");
        return;
      }
    });
  } else if (command === "undo") {
    const number = parseInt(taskText);
    if (isNaN(number)) {
      console.log("Enter a valid number to Make this task undo");
      return;
    } else if (number < 1 || number > tasks.length) {
      console.log("Invalid number to Undo Task ");
      return;
    }
    tasks[number - 1].completed = !tasks[number - 1].completed;
    console.log("Task status has been changed");
    fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        console.log("Error saving task");
        return;
      }
    });
    // search with the keywords
  } else if (command === "search") {
    const keyword = taskText;
    if (!keyword) {
      console.log("Provide the proper keyword to search ");
    } else {
      const foundKeyword = tasks.filter((task) =>
        task.text
          .toLocaleLowerCase()
          .trim()
          .includes(keyword.toLocaleLowerCase().trim())
      );
      if (foundKeyword.length > 0) {
        console.log(`Found ${foundKeyword.length} that matches the task`);
        foundKeyword.forEach((item, index) => {
          console.log(
            `${index + 1}.${item} [${item.completed ? "Done" : "Pending"}]`
          );
        });
      } else {
        console.log(`No tasks found containing: "${keyword}"`);
      }
    }
  } else {
    console.log("Unknown Command");
  }
});
