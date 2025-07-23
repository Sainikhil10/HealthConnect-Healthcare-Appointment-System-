function toggleForms() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
  signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
}

function signup() {
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (!username || !password) {
    alert('Please enter username and password');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username]) {
    alert('Username already exists');
    return;
  }

  users[username] = { password, role: 'patient' };
  localStorage.setItem('users', JSON.stringify(users));
  alert('Signup successful! Please login.');
  toggleForms();
}

function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  let users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username] && users[username].password === password) {
    localStorage.setItem('loggedInUser', username);
    const role = users[username].role;
    if (role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'dashboard.html';
    }
  } else {
    alert('Invalid username or password');
  }
}
