const routes = {
  "/login": {
    templateId: "login",
    title: "Login - Bank of Jupiter",
    onNavigate: () => {},
  },
  "/register": {
    templateId: "register",
    title: "Register - Bank of Jupiter",
    onNavigate: () => console.log("Register page loaded."),
  },
  "/dashboard": {
    templateId: "dashboard",
    title: "Dashboard - Bank of Jupiter",
    onNavigate: () => console.log("Dashboard loaded."),
  },
  "/profile": {
    templateId: "profile",
    title: "Profile - Bank of Jupiter",
    onNavigate: () => console.log("Profile page loaded."),
  },
};

async function register() {
  console.log("Register function triggered.");
  const registerForm = document.getElementById("registerForm");
  const formData = new FormData(registerForm);

  const jsonData = JSON.stringify(Object.fromEntries(formData));

  try {
    const result = await createAccount(jsonData);

    if (result.error) {
      console.error("Error occurred:", result.error);
      alert(`Registration failed: ${result.error}`);
    } else {
      console.log("Account created successfully:", result);
      alert("Registration successful!");
      navigate("/login");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An unexpected error occurred. Please try again.");
  }
}

async function createAccount(account) {
  try {
    const response = await fetch("http://localhost:5000/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: account,
    });
    return await response.json();
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}

function updateRoute() {
  const path = window.location.pathname;
  const route = routes[path];

  if (!route) {
    return navigate("/login");
  }

  document.title = route.title || "Bank of Jupiter";

  const template = document.getElementById(route.templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById("app");

  app.innerHTML = "";
  app.appendChild(view);

  if (typeof route.onNavigate === "function") {
    route.onNavigate();
  }
}

function navigate(path) {
  window.history.pushState({}, path, path);
  updateRoute();
}

function onLinkClick(event) {
  event.preventDefault();
  navigate(event.target.href);
}

window.onpopstate = () => updateRoute();
updateRoute();
