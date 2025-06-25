const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = localStorage.getItem("currentUser");

function registerUser() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  if (!name || !email || !password) return alert("Please fill in all fields.");
  if (!email.includes("@")) return alert("Invalid email format.");
  if (users.find(user => user.email === email)) return alert("Email already exists.");

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful!");
  window.location.href = "index.html";
}

function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const user = users.find(u => u.email === email);

  if (!user) return alert("Email not registered.");
  if (user.password !== password) return alert("Incorrect password.");

  localStorage.setItem("currentUser", user.name);
  window.location.href = "home.html";
}

if (window.location.pathname.includes("home.html")) {
  if (!currentUser) {
    window.location.href = "index.html";
  } else {
    document.getElementById("homeContainer").innerHTML = `
      <h2>Welcome, ${currentUser}</h2>
      <button onclick="logout()">Logout</button>
    `;
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
