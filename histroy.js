const loggedInUserHistory = localStorage.getItem('loggedInUser');
if (!loggedInUserHistory) {
  window.location.href = 'index.html';
}

function getAppointments() {
  return JSON.parse(localStorage.getItem('appointments')) || [];
}

function renderHistory() {
  const appts = getAppointments().filter(a => a.username === loggedInUserHistory);
  const container = document.getElementById('history-container');
  container.innerHTML = '';

  if (appts.length === 0) {
    container.innerHTML = '<p>No appointment history found.</p>';
    return;
  }

  appts.forEach(appt => {
    const div = document.createElement('div');
    div.className = 'appointment-card';
    div.innerHTML = `
      <p><strong>Doctor:</strong> ${appt.doctor}</p>
      <p><strong>Date:</strong> ${appt.date}</p>
      <p><strong>Time:</strong> ${appt.time}</p>
      <p><strong>Status:</strong> ${appt.status}</p>
    `;
    container.appendChild(div);
  });
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}

window.onload = renderHistory;
