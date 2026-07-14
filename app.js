async function loadSidebar(slotId = "sidebar-slot") {
  try {
    const response = await fetch("menu.html");
    const slot = document.getElementById(slotId);
    if (!slot) return;

    if (response.ok) {
      const htmlContent = await response.text();
      slot.innerHTML = htmlContent;

      const scriptElement = slot.querySelector("script");
      if (scriptElement) {
        const inlineScript = scriptElement.innerHTML;
        if (inlineScript.trim()) {
          eval(inlineScript);
        }
      }
    } else {
      slot.innerHTML = "<p style='padding:1rem;color:red;'>Gagal memuat komponen menu.</p>";
    }
  } catch (error) {
    console.error("Error loading sidebar:", error);
  }
}

function toggleMobileMenu() {
  const isMobile = window.matchMedia("(max-width: 1024px)").matches;
  if (isMobile) {
    document.body.classList.toggle("menu-mode-active");
  } else {
    document.body.classList.toggle("sidebar-collapsed");
  }
}

function handleLogout() {
  localStorage.removeItem("wax_logged_user");
  window.location.replace("index.html");
}
