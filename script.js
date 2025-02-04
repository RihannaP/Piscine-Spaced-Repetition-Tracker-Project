// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";

window.onload = function () {
  populateUserDropdown();

  // Add event listener for user selection
  const userSelect = document.getElementById("user-select");
  userSelect.addEventListener("change", handleUserSelection);
};

// Populates the user dropdown with IDs fetched from storage.js
function populateUserDropdown() {
  const userSelect = document.getElementById("user-select");
  const users = getUserIds();

  // Create a default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "--Select a user--";
  userSelect.appendChild(defaultOption);

  // Populate dropdown with user options
  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });
}

// Handles user selection and displays a static message
function handleUserSelection(event) {
  const selectedUserId = event.target.value; 
  const agendaDiv = document.getElementById("agenda");

  // Clear any previous content
  agendaDiv.innerHTML = "";

  // If a user is selected, show the static message
  if (selectedUserId) {
    const message = document.createElement("p");
    message.textContent = "No agenda is found for the selected user.";
    agendaDiv.appendChild(message);
  }
}