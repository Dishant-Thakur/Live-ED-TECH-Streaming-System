document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  const closeSidebar = () => { sidebar.classList.remove("show"); backdrop.classList.remove("show"); };
  
  document.getElementById("menuToggle")?.addEventListener("click", () => { sidebar.classList.add("show"); backdrop.classList.add("show"); });
  document.getElementById("sidebarClose")?.addEventListener("click", closeSidebar);
  backdrop?.addEventListener("click", closeSidebar);
  document.querySelectorAll(".side-nav .nav-link").forEach(link => link.addEventListener("click", () => {
    document.querySelectorAll(".side-nav .nav-link").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    if (innerWidth < 992) closeSidebar();
  }));

  const themeButton = document.getElementById("themeToggle");
  const applyTheme = dark => {
    document.body.classList.toggle("dark-mode", dark);
    themeButton.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
    localStorage.setItem("edunest-admin-theme", dark ? "dark" : "light");
  };
  applyTheme(localStorage.getItem("edunest-admin-theme") === "dark");
  themeButton?.addEventListener("click", () => applyTheme(!document.body.classList.contains("dark-mode")));

  const search = document.getElementById("globalSearch");
  search?.addEventListener("input", () => {
    const term = search.value.trim().toLowerCase();
    document.querySelectorAll(".table-panel").forEach(panel => {
      const rows = [...panel.querySelectorAll("tbody tr")];
      let shown = 0;
      rows.forEach(row => {
        const match = row.innerText.toLowerCase().includes(term);
        row.classList.toggle("d-none", !match);
        if (match) shown++;
      });
      panel.querySelector(".empty-search")?.classList.toggle("d-none", shown > 0 || term === "");
    });
  });

  const toastEl = document.getElementById("dashboardToast");
  const toast = toastEl ? new bootstrap.Toast(toastEl, {delay: 2500}) : null;
  const logout = () => {
    if (confirm("Are you sure you want to log out?")) {
      document.getElementById("toastMessage").textContent = "Connect this button to your Edunest logout API.";
      toast?.show();
    }
  };
  document.getElementById("logoutBtn")?.addEventListener("click", logout);
  document.getElementById("profileLogout")?.addEventListener("click", logout);
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); search?.focus(); }
    if (e.key === "Escape") closeSidebar();
  });
});
