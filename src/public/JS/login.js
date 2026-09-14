const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const role = document.getElementById("select_role").value;
  let email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const validTexts = document.querySelectorAll(".text_valid");
  validTexts.forEach((text) => {
    text.innerText = "";
    text.style.color = "";
  });

  if (!role) {
    validTexts[0].innerText = "Dear user, please select a role";
    validTexts[0].style.color = "red";
    return;
  }

  email = email.trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    validTexts[1].innerText = "Please enter a valid email";
    validTexts[1].style.color = "red";
    return;
  }

  if (password.length < 8) {
    validTexts[2].innerText = "Password length must be 8 or more";
    validTexts[2].style.color = "red";
    return;
  }

  try {
    const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            role,
            email,
            password,
        }),
    });

    console.log("Status:", response.status);

    const contentType = response.headers.get("content-type");
    console.log("Content-Type:", contentType);

    if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Server returned:", text);

        validTexts[2].innerText =
            `Server returned ${response.status}. Check backend route.`;

        validTexts[2].style.color = "red";
        return;
    }

    const data = await response.json();

    console.log("Login response:", data);

    if (!response.ok) {
        validTexts[2].innerText = data.message;
        validTexts[2].style.color = "red";
        return;
    }

    if (data.role === "admin") {
        window.location.href = "/adminDashboard.html";
    } 
    else if (data.role === "faculty") {
        window.location.href = "/facultyDashboard.html";
    } 
    else if (data.role === "user") {
        window.location.href = "/userDashboard.html";
    }

} catch (error) {
    console.error("LOGIN ERROR:", error);

    validTexts[2].innerText =
        "Unable to connect with server. Please try again.";

    validTexts[2].style.color = "red";
}
});