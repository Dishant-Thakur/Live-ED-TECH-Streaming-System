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
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const passwordError = document.getElementById("passwordError");

confirmPassword.addEventListener("input", function() {
    if (confirmPassword.value !== newPassword.value && confirmPassword.value.length > 0) {
        passwordError.textContent = "Passwords do not match.";
        confirmPassword.classList.add("is-invalid");
    } else {
        passwordError.textContent = "";
        confirmPassword.classList.remove("is-invalid");
    }
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (newPassword.value !== confirmPassword.value) {
        passwordError.textContent = "Passwords do not match.";
        confirmPassword.classList.add("is-invalid");
        return;
    }

    if (newPassword.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        return;
    }
    console.log("Password reset request submitted.");
});