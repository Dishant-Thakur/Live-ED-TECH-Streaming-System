
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const role = document.getElementById("select_role").value;
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const validTexts = document.querySelectorAll(".text_valid");

    validTexts.forEach((text) => {
        text.innerText = "";
        text.style.color = "";
    });

    if (!role) {
        validTexts[0].innerText = "Please select a role";
        validTexts[0].style.color = "red";
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailPattern.test(email)) {
        validTexts[1].innerText = "Please enter a valid email";
        validTexts[1].style.color = "red";
        return;
    }

    if (password.length < 8) {
        validTexts[2].innerText = "Password must contain at least 8 characters";
        validTexts[2].style.color = "red";
        return;
    }

    try {
        const response = await fetch("/api/v1/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                role,
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok || !data.status) {
            validTexts[2].innerText = data.message || "Login failed";
            validTexts[2].style.color = "red";
            return;
        }

        const dashboardRoutes = {
            admin: "/admin/dashboard",
            faculty: "/faculty/dashboard",
            user: "/user/dashboard"
        };

        const redirectUrl = dashboardRoutes[data.role];

        if (!redirectUrl) {
            validTexts[2].innerText = "Invalid user role received from server";
            validTexts[2].style.color = "red";
            return;
        }

        window.location.href = redirectUrl;

    } catch (error) {
        console.error("Login error:", error);

        validTexts[2].innerText = "Unable to connect with server. Please try again.";
        validTexts[2].style.color = "red";
    }
});
