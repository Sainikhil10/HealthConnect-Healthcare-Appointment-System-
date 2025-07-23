const loggedInUserAdmin = localStorage.getItem('loggedInUser');
if (!loggedInUserAdmin) {
  window.location.href = 'index.html';
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}

function getDoctors() {
  return JSON.parse(localStorage.getItem('doctors')) || [];
}

function saveDoctors(doctors) {
  localStorage.setItem('doctors', JSON.stringify(doctors));
}

function getAppointments() {
  return JSON.parse(localStorage.getItem('appointments')) || [];
}

function renderDoctors() {
  const doctors = getDoctors();
  const container = document.getElementById('admin-doctors-list');
  container.innerHTML = '';

  if (doctors.length === 0) {
    container.innerHTML = '<p>No doctors added yet.</p>';
    return;
  }

  doctors.forEach((doc, i) => {
    const div = document.createElement('div');
    div.className = 'doctor-card';
    div.innerHTML = `
      <h3>${doc.name}</h3>
      <p><strong>Specialty:</strong> ${doc.specialty}</p>
      <button onclick="removeDoctor(${i})">Remove</button>
    `;
    container.appendChild(div);
  });
}

function addDoctor() {
  const name = document.getElementById('doctor-name').value.trim();
  const specialty = document.getElementById('doctor-specialty').value.trim();

  if (!name || !specialty) {
    alert('Please enter doctor name and specialty');
    return;
  }

  const doctors = getDoctors();
  doctors.push({ name, specialty });
  saveDoctors(doctors);

  document.getElementById('doctor-name').value = '';
  document.getElementById('doctor-specialty').value = '';
  renderDoctors();
}

function removeDoctor(index) {
  const doctors = getDoctors();
  doctors.splice(index, 1);
  saveDoctors(doctors);
  renderDoctors();
}

function renderAppointments() {
  const appts = getAppointments();
  const container = document.getElementById('admin-appointments-list');
  container.innerHTML = '';

  if (appts.length === 0) {
    container.innerHTML = '<p>No appointments booked.</p>';
    return;
  }

  appts.forEach((appt, i) => {
    const div = document.createElement('div');
    div.className = 'appointment-card';
    div.innerHTML = `
      <p><strong>Patient:</strong> ${appt.username}</p>
      <p><strong>Doctor:</strong> ${appt.doctor}</p>
      <p><strong>Date:</strong> ${appt.date}</p>
      <p><strong>Time:</strong> ${appt.time}</p>
      <p><strong>Status:</strong> ${appt.status}</p>
      <button onclick="cancelAppointment(${i})">Cancel</button>
    `;
    container.appendChild(div);
  });
}

function cancelAppointment(index) {
  const appts = getAppointments();
  appts.splice(index, 1);
  localStorage.setItem('appointments', JSON.stringify(appts));
  renderAppointments();
}

window.onload = () => {
  renderDoctors();
  renderAppointments();
};
