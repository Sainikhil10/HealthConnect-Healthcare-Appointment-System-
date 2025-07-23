const loggedInUserDashboard = localStorage.getItem('loggedInUser');
if (!loggedInUserDashboard) {
  window.location.href = 'index.html';
}

function getDoctors() {
  return JSON.parse(localStorage.getItem('doctors')) || [];
}

function getAppointments() {
  return JSON.parse(localStorage.getItem('appointments')) || [];
}

function saveAppointments(appts) {
  localStorage.setItem('appointments', JSON.stringify(appts));
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}

function populateDoctors() {
  const doctors = getDoctors();
  const select = document.getElementById('doctor-select');
  select.innerHTML = '<option value="">Select Doctor</option>';

  doctors.forEach(doc => {
    const option = document.createElement('option');
    option.value = doc.name;
    option.textContent = `${doc.name} (${doc.specialty})`;
    select.appendChild(option);
  });
}

function bookAppointment() {
  const doctor = document.getElementById('doctor-select').value;
  const date = document.getElementById('appointment-date').value;
  const time = document.getElementById('appointment-time').value;

  if (!doctor || !date || !time) {
    alert('Please fill all fields');
    return;
  }

  const appts = getAppointments();

  appts.push({
    id: Date.now(),
    username: loggedInUserDashboard,
    doctor,
    date,
    time,
    status: 'Booked'
  });

  saveAppointments(appts);
  alert('Appointment booked!');
  renderAppointments();
}

function renderAppointments() {
  const appts = getAppointments().filter(a => a.username === loggedInUserDashboard);
  const container = document.getElementById('appointments-container');
  container.innerHTML = '';

  if (appts.length === 0) {
    container.innerHTML = '<p>No upcoming appointments.</p>';
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

window.onload = () => {
  populateDoctors();
  renderAppointments();
};
