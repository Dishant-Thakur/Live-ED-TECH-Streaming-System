function togglePassword(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

const form = document.getElementById("forgotPasswordForm");
const email = document.getElementById("email");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const passwordError = document.getElementById("passwordError");
const check_exists = document.getElementById("check_exists");

confirmPassword.addEventListener("input", function() {
    if (
        confirmPassword.value !== newPassword.value &&
        confirmPassword.value.length > 0
    ) {
        passwordError.textContent = "Passwords do not match.";
        confirmPassword.classList.add("is-invalid");
    } else {
        passwordError.textContent = "";
        confirmPassword.classList.remove("is-invalid");
    }
});

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    if (newPassword.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        newPassword.classList.add("is-invalid");
        return;
    }

    if (newPassword.value !== confirmPassword.value) {
        passwordError.textContent = "Passwords do not match.";
        confirmPassword.classList.add("is-invalid");
        return;
    }

    passwordError.textContent = "";
    confirmPassword.classList.remove("is-invalid");

    try {
    const response = await fetch("/api/v1/auth/change-password", {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: email.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value
    })
});

const data = await response.json();

if (!data.status) {
    check_exists.innerText = data.message;
    check_exists.style.color = "red";
    return;
}

check_exists.innerText = data.message;
check_exists.style.color = "green";

setTimeout(() => {
    window.location.href = "/signin.html";
}, 1000)}
catch (error) {
        check_exists.innerText = "Failed to update password. Internal server error.";
        check_exists.style.color = "red";
    }
});
