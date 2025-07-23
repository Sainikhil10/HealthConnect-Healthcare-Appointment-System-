const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
  window.location.href = 'index.html';
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}

function getDoctors() {
  return JSON.parse(localStorage.getItem('doctors')) || [];
}

function renderDoctors() {
  const doctors = getDoctors();
  const container = document.getElementById('doctors-list');
  container.innerHTML = '';

  if (doctors.length === 0) {
    container.innerHTML = '<p>No doctors found.</p>';
    return;
  }

  doctors.forEach(doc => {
    const div = document.createElement('div');
    div.className = 'doctor-card';
    div.innerHTML = `
      <h3>${doc.name}</h3>
      <p><strong>Specialty:</strong> ${doc.specialty}</p>
    `;
    container.appendChild(div);
  });
}

window.onload = renderDoctors;
