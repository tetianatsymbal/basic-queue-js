// Define the maximum size of the queue (my age)
const MAX_QUEUE_SIZE = 29;

let queue = [];

const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const removeButton = document.getElementById("remove-button");

const inputError = document.getElementById("input-error");
const queueError = document.getElementById("queue-error");

const queueList = document.getElementById("queue-list");

// Load the queue from local storage (if available)
if (localStorage.getItem("queue")) {
  queue = JSON.parse(localStorage.getItem("queue"));
  updateQueueVisualization();
}

inputField.addEventListener("input", handleInputFieldChange);
addButton.addEventListener("click", handleAddButtonClick);
removeButton.addEventListener("click", handleRemoveButtonClick);

function isInputValid() {
  if (inputField.value.trim() === "") {
    inputError.innerText = "Input field cannot be empty";
    return false;
  }
  inputError.innerText = "";
  queueError.innerText = "";
  return true;
}

function isQueueValid() {
  if (queue.length === 0) {
    queueError.innerText = "Queue is empty";
    return false;
  }

  queueError.innerText = "";
  return true;
}
function isQueueFull() {
  if (queue.length >= MAX_QUEUE_SIZE) {
    queueError.innerText = "Queue is full";
    return false;
  }
  queueError.innerText = "";
  return true;
}

function handleInputFieldChange() {
  isInputValid();
}

function handleAddButtonClick() {
  if (isInputValid() && isQueueFull()) {
    queue.push(inputField.value.trim());
    inputField.value = "";
    updateQueueVisualization();
    localStorage.setItem("queue", JSON.stringify(queue));
  }
}

function handleRemoveButtonClick() {
  if (isQueueValid()) {
    queue.shift();
    updateQueueVisualization();
    localStorage.setItem("queue", JSON.stringify(queue));
  }
}

function updateQueueVisualization() {
  queueList.innerHTML = "";

  queue.forEach(function (item) {
    const listItem = document.createElement("li");
    listItem.innerText = item;
    queueList.appendChild(listItem);
  });
}
