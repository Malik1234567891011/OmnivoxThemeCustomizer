// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setTheme") {
      applyTheme(request.theme);
    }
  });
  
  // Function to apply the selected theme
  function applyTheme(theme) {
    let css = "";
    if (theme === "light") {
      css = `
        body {
          background-color: #ffffff;
          color: #000000;
        }
      `;
    } else if (theme === "dark") {
      css = `
        body {
          background-color: #000000;
          color: #ffffff;
        }
      `;
    }
  
    // Inject the CSS into the page
    const styleTag = document.getElementById("theme-styles") || document.createElement("style");
    styleTag.id = "theme-styles";
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
  }
  