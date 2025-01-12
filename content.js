// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setTheme") {
      applyTheme(request.theme);
    }
  });
  // Apply the selected theme
function applyTheme(theme) {
    console.log("Applying theme:", theme); // Debugging log
    let css = "";
  
    if (theme === "light") {
      css = `
        * {
          background-color: #ffffff !important;
          color: #000000 !important;
          border-color: #ccc !important;
        }
        a {
          color: #1a0dab !important;
        }
      `;
    } else if (theme === "dark") {
      css = `
        * {
          background-color: #121212 !important;
          color: #e0e0e0 !important;
          border-color: #333 !important;
        }
        a {
          color: #bb86fc !important;
        }
        img, video {
          filter: brightness(0.8) !important;
        }
        .card, .box, .panel, .container, .widget, .block, .content, .section {
          background-color: #1e1e1e !important;
          border-color: #444 !important;
        }
        input, textarea, select, button {
          background-color: #2a2a2a !important;
          color: #e0e0e0 !important;
          border-color: #555 !important;
        }
      `;
    }
  
    let styleTag = document.getElementById("custom-theme-style");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "custom-theme-style";
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = css;
  }
  
  
  // Reapply the theme when the page updates dynamically
  const observer = new MutationObserver(() => {
    chrome.storage.sync.get("theme", (data) => {
      if (data.theme) {
        applyTheme(data.theme);
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  