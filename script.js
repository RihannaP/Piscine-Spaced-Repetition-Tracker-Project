// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.
import {getData} from "./storage.js";
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
    displayAgenda(selectedUserId);
  }
  else {
    document.getElementById('agenda').innerHTML = 'Please select a user.';
  }
}








// Function to display the agenda for a selected user in a table
function displayAgenda(userId){
  const agendaContainer = document.getElementById("agenda") 
  agendaContainer.textContent = ""

  // Get the user's data from storage
   //const agenda = getData(userId)
   const agenda = sampleData[userId]

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

 const sampleData = {
  1: [
    { topic: "Functions in JS", date: "2025-07-26" },
    { topic: "Functions in JS", date: "2025-08-19" },
    { topic: "Functions in JS", date: "2025-10-19" },
    { topic: "Functions in JS", date: "2026-01-19" },
    { topic: "Functions in JS", date: "2026-07-19" },
  ],
  2: [
    { topic: "Functions in Python", date: "2025-10-12" },
    { topic: "Functions in Python", date: "2025-11-05" },
    { topic: "Variables in Python", date: "2025-11-12" },
    { topic: "Variables in Python", date: "2025-12-05" },
    { topic: "Functions in Python", date: "2026-01-05" },
    { topic: "Variables in Python", date: "2026-02-05" },
    { topic: "Functions in Python", date: "2026-04-05" },
    { topic: "Variables in Python", date: "2026-05-05" },
    { topic: "Functions in Python", date: "2026-10-05" },
    { topic: "Variables in Python", date: "2026-11-05" },
  ],
  3: [
    { topic: "Codewars", date: "2025-01-05" },  // Assume today is 2025-02-05 so shoudn't show
    { topic: "Codewars", date: "2025-03-05" },
    { topic: "Codewars", date: "2025-06-05" },
    { topic: "Codewars", date: "2026-01-05" },
  ],
  4: [
    { topic: "HTML Basics", date: "2025-03-01" },
    { topic: "HTML Basics", date: "2025-03-08" },
    { topic: "HTML Basics", date: "2025-04-01" },
    { topic: "HTML Basics", date: "2025-07-01" },
    { topic: "HTML Basics", date: "2026-03-01" },
  ],
  5: [
    { topic: "React Components", date: "2025-05-15" },
    { topic: "React Components", date: "2025-06-15" },
    { topic: "React Components", date: "2025-08-15" },
    { topic: "React Components", date: "2025-11-15" },
    { topic: "React Components", date: "2026-05-15" },
  ],
};
