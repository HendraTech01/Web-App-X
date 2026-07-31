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
          window.eval(inlineScript);
        }
      }
    } else {
      slot.innerHTML = "<p style='padding:1rem;color:red;'>Gagal memuat komponen menu.</p>";
    }

    ensureSidebarOverlay();
  } catch (error) {
    console.error("Error loading sidebar:", error);
  }
}

function isPortraitMobile() {
  return window.matchMedia("(max-width: 768px) and (orientation: portrait)").matches;
}

function ensureSidebarOverlay() {
  let overlay = document.querySelector(".app-sidebar-overlay");
  if (overlay) return;
  const wrapper = document.querySelector(".app-layout-wrapper");
  if (!wrapper) return;
  overlay = document.createElement("div");
  overlay.className = "app-sidebar-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.addEventListener("click", closeMobileMenu);
  wrapper.appendChild(overlay);
}

function toggleMobileMenu() {
  const body = document.body;
  if (isPortraitMobile()) {
    body.classList.toggle("menu-mode-active");
  } else {
    body.classList.remove("menu-mode-active");
    body.classList.toggle("sidebar-collapsed");
  }
}

function closeMobileMenu() {
  document.body.classList.remove("menu-mode-active");
}

document.addEventListener("click", function (event) {
  if (event.target.closest(".app-nav-item") && isPortraitMobile()) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

window.addEventListener("resize", function () {
  if (isPortraitMobile()) {
    document.body.classList.remove("sidebar-collapsed");
  } else {
    document.body.classList.remove("menu-mode-active");
  }
});

function handleLogout() {
  localStorage.removeItem("wax_logged_user");
  localStorage.removeItem("wax_menu_access_data");
  window.location.replace("index.html");
}
