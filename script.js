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

  // Create new topic object
  const newTopic = { topic: topicName, date: startDate };
  const newTopics = calculateFutureDates(newTopic)
  // Save data to localStorage
  addData(userId, newTopics);

  // Clear input fields
  document.getElementById("topic-name").value = "";
  document.getElementById("start-date").value = "";

  // Refresh the agenda display
  displayAgenda(userId);
}

//one week, one month, three months, six months and one year from the selected date
function calculateFutureDates(newTopic) {
  const startDate = new Date(newTopic.date);

  // Create new Date objects for each calculation to avoid modifying the original date
  const nextWeekObj = { 
    topic: newTopic.topic, 
    date: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000) // Add 7 days
  };

  const nextMonthObj = { 
    topic: newTopic.topic, 
    date: new Date(new Date(startDate).setMonth(startDate.getMonth() + 1)) // Add 1 month
  };

  const next3MonthObj = { 
    topic: newTopic.topic, 
    date: new Date(new Date(startDate).setMonth(startDate.getMonth() + 3)) // Add 3 months
  };

  const next6MonthObj = { 
    topic: newTopic.topic, 
    date: new Date(new Date(startDate).setMonth(startDate.getMonth() + 6)) // Add 6 months
  };

  const nextYearObj = { 
    topic: newTopic.topic, 
    date: new Date(new Date(startDate).setFullYear(startDate.getFullYear() + 1)) // Add 1 year
  };

  // Return an array of all the dates including the original one
  return [newTopic, nextWeekObj, nextMonthObj, next3MonthObj, next6MonthObj, nextYearObj];
}




// Function to display the agenda for a selected user in a table
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

