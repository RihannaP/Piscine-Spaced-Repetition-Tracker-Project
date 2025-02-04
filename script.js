// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";

function displayAgenda(userId){
 const agendaContainer = document.getElementById("agenda") 
 agendaContainer.textContent = ""
  const agenda = getData(userId)
  if (!agenda || agenda.length === 0) {
    document.getElementById('agenda').innerHTML = 'No agenda available for this user.';
    return;
  }
  const today = new Date();
  const futureAgenda = agenda.filter(item => new Date(item.date) >= today);

  futureAgenda.sort((a, b) => new Date(a.date) - new Date(b.date));

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

  document.getElementById('agenda').innerHTML = agendaHtml;
}


window.onload = function () {
  const users = getUserIds();
  document.querySelector("p").innerText = `There are ${users.length} users`;
};
