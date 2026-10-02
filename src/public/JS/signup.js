const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const role = document.getElementById('select_role').value;
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_pass = document.getElementById('confirm_pass').value;
    const validTexts = document.querySelectorAll('.text_valid');

    validTexts.forEach((text) => {
        text.innerText = "";
        text.style.color = "";
    });

    if (!role) {
        validTexts[0].innerText = 'Dear user, please select a role';
        validTexts[0].style.color = 'red';
        return;
    }

    name = name.trim();
    email = email.trim().toLowerCase();
    phone = phone.replace(/\s/g, '');

    if (!name) {
        validTexts[1].innerText = 'Please enter your name';
        validTexts[1].style.color = 'red';
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        validTexts[3].innerText = 'Please enter a valid email';
        validTexts[3].style.color = 'red';
        return;
    }

    const phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(phone)) {
        validTexts[2].innerText = 'Invalid phone number';
        validTexts[2].style.color = 'red';
        return;
    }
    
    if (password.length < 8) {
        validTexts[4].innerText = 'Password length must be 8 or more';
        validTexts[4].style.color = 'red';
        return;
    }

    if (password !== confirm_pass) {
        validTexts[5].innerText = 'Password does not match';
        validTexts[5].style.color = 'red';
        return;
    } 

    try{
        const response = await fetch("api/v1/auth/register",{
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                role,name,phone,email,password,confirm_pass,
            })
        });
        const data = await response.json();
        if(!data.status){
        validTexts[5].innerText = data.message;
        validTexts[5].style.color = 'red';
        return;
        }

        validTexts[5].innerText = data.message;
        validTexts[5].style.color = 'green';

        setTimeout(() => {
            window.location.href = "/signin.html";
        },1000);
    }
    catch(error){
        validTexts[5].innerText = 'Internal server error';
        validTexts[5].style.color = 'red';
    }
});

