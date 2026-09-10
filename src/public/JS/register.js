const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", function () {
    this.value = this.value
        .replace(/\D/g, "")
        .slice(0, 10);
});

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);
    const icon = button.querySelector("i");

    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");

    } else {

        input.type = "password";

        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
}


const registerForm =
    document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {

        alert("Password and Confirm Password do not match.");

        return;
    }

    const userData = {

        name:
            document.getElementById("name").value,

        phone:
            document.getElementById("phone").value,

        email:
            document.getElementById("email").value,

        password:
            password
    };

    console.log("Registration Data:", userData);

    alert("Registration form submitted successfully.");
});
