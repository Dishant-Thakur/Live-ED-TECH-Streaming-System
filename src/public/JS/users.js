const catched_session_data = () => {
    fetch("/api/v1/auth/me",{
        method: "GET",
        credentials: "include"
    }).then(async (response) => {
            if (response.status === 401) {
                const data = await response.json();
                showSessionExpired(data.message);
                return null;
            }
            if(response.status === 500){
                throw new Error('Interal server error');
            }
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (!data) return;

            const user = data.user;
            const firstLetter = user.name.trim().charAt(0).toUpperCase();
            document.getElementById("userInitial").textContent = firstLetter;
            document.getElementById("welcome_message").textContent = `Welcome ${user.name} on Edunest`;

            const mobileMenuButton = document.getElementById("mobileMenuButton");
            const mobileMenu = document.getElementById("mobileMenu");

            if (mobileMenuButton && mobileMenu){
                mobileMenuButton.addEventListener("click", function () {
                    mobileMenu.classList.toggle("show");
                });
            }
        })
        .catch((error) => {
            console.error("Error fetching session");
        });
};
function showSessionExpired(message){
    document.body.innerHTML = `
        <div class="session-expired-wrapper">
            <div class="session-expired-card">
                <div class="session-expired-icon">
                    <i class="bi bi-clock-history"></i>
                </div>

                <div class="session-expired-content">
                    <h2>Session Expired</h2>
                    <p>${message || "Your session has expired. Please login again to continue."}</p>
                </div>

                <button class="session-login-btn" id="sessionLoginButton">
                    <i class="bi bi-box-arrow-in-right"></i>
                    Login Again
                </button>

            </div>
        </div>
    `;
    document.getElementById("sessionLoginButton").addEventListener("click", ()=>{
            window.location.href = "/signin.html";
        });
}
catched_session_data();