// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.
import { getData, addData, getUserIds } from "./storage.js";

window.onload = function () {
  populateUserDropdown();

  // Add event listener for user selection
  const userSelect = document.getElementById("user-select");
  userSelect.addEventListener("change", handleUserSelection);

  // Add event listener for topic submission
  document
    .getElementById("add-topic-form")
    .addEventListener("submit", handleTopicSubmission);
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

// Handles user selection and displays the user's stored agenda
function handleUserSelection(event) {
  const selectedUserId = event.target.value; 
  const agendaDiv = document.getElementById("agenda");

  // Clear any previous content
  agendaDiv.innerHTML = "";

  // If a user is selected, show the static message
  if (selectedUserId) {
    displayAgenda(selectedUserId);
  }
  else {
    document.getElementById('agenda').innerHTML = 'Please select a user.';
  }
}

// Function to handle topic submission, calculate revision dates, and store them in localStorage
function handleTopicSubmission(event) {
  event.preventDefault();

  const userId = document.getElementById("user-select").value;
  const topicName = document.getElementById("topic-name").value;
  const startDate = document.getElementById("start-date").value;

  // Ensure a user is selected
  if (!userId) {
    alert("Please select a user before adding a topic.");
    return;
  }

  // Calculate revision dates
  const revisionDates = calculateRevisionDates(startDate);

  // Create new topic objects with revision dates
  const newTopics = revisionDates.map(date => ({ topic: topicName, date }));

  // Save data to localStorage
  addData(userId, newTopics);

  // Clear input fields
  document.getElementById("topic-name").value = "";
  document.getElementById("start-date").value = "";

  // Refresh the agenda display
  displayAgenda(userId);
}

// Function to calculate revision dates
function calculateRevisionDates(startDate) {
  const baseDate = new Date(startDate);
  return [
    new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 7), // 1 week
    new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, baseDate.getDate()), // 1 month
    new Date(baseDate.getFullYear(), baseDate.getMonth() + 3, baseDate.getDate()), // 3 months
    new Date(baseDate.getFullYear(), baseDate.getMonth() + 6, baseDate.getDate()), // 6 months
    new Date(baseDate.getFullYear() + 1, baseDate.getMonth(), baseDate.getDate()) // 1 year
  ].map(date => date.toISOString().split("T")[0]); // Convert to YYYY-MM-DD format
}

// Function to display the agenda for a selected user
function displayAgenda(userId){
  const agendaContainer = document.getElementById("agenda") 
  agendaContainer.textContent = ""

  // Get the user's data from storage
  const agenda = getData(userId)

   // If there is no agenda for the user, display a message
   if (!agenda || agenda.length === 0) {
     document.getElementById('agenda').innerHTML = 'No agenda available for this user.';
     return;
   }

   // Filter out topics with revision dates in the past
   const today = new Date();
   const futureAgenda = agenda.filter(item => new Date(item.date) >= today);

   // Sort the agenda by revision date in chronological order
   futureAgenda.sort((a, b) => new Date(a.date) - new Date(b.date));

     // Generate the table content
   let agendaHtml = `
       <table border="1">
         <thead>
           <tr>
             <th>Topic</th>
             <th>Revision Date</th>
           </tr>
         </thead>
         <tbody>
     `;

     // Add each agenda item to the table body
     futureAgenda.forEach(item => {
       const topic = item.topic;
       const date = new Date(item.date).toLocaleDateString();
       agendaHtml += `
         <tr>
           <td>${topic}</td>
           <td>${date}</td>
         </tr>
       `;
     });
 
   agendaHtml += '</tbody></table>';
 
   // Insert the generated table into the agenda container
   document.getElementById('agenda').innerHTML = agendaHtml;
 }

