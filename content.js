// Apply the saved theme immediately on load
chrome.storage.sync.get("theme", (data) => {
    if (data.theme) {
      applyTheme(data.theme);
    }
  });
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setTheme") {
      applyTheme(request.theme);
    }
  });
  
  function applyTheme(theme) {
    console.log("Applying theme:", theme);
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
        .card, .box, .panel, .container, .widget, .block, .content, .section,
        .main, .content-wrapper, .calendar, .assignment, .announcement, .classroom {
          background-color: #1e1e1e !important;
          border-color: #444 !important;
        }
        input, textarea, select, button {
          background-color: #2a2a2a !important;
          color: #e0e0e0 !important;
          border-color: #555 !important;
        }
      `;
    }else if (theme === "colorblind") {
        css = `
          * {
            background-color: #f0f0f0 !important;
            color: #000000 !important;
          }
    
          a {
            color: #0072B2 !important; /* Safe blue */
          }
    
          .important, .alert {
            background-color: #E69F00 !important; /* Safe orange */
            color: #000000 !important;
          }
    
          .success {
            background-color: #56B4E9 !important; /* Light blue for success */
          }
    
          .warning {
            background-color: #F0E442 !important; /* Yellow for warning */
          }
    
          .error {
            background-color: #D55E00 !important; /* Dark orange for errors */
            color: #ffffff !important;
          }
    
          button, input, select {
            background-color: #f7f7f7 !important;
            color: #000000 !important;
            border: 1px solid #999 !important;
          }
    
          /* Add borders for elements that rely on color */
          .status, .indicator {
            border: 2px dashed #000000 !important;
          }
        `;
      }else if (theme === "oceantheme") {
        css = `
          * {
            background-color:rgb(28, 52, 148) !important;
            color: #e0e0e0 !important;
            border-color: #333 !important;
          }
          a {
            color: #bb86fc !important;
          }
          img, video {
            filter: brightness(0.8) !important;
          }
          .card, .box, .panel, .container, .widget, .block, .content, .section,
          .main, .content-wrapper, .calendar, .assignment, .announcement, .classroom {
            background-color:rgb(11, 27, 174) !important;
            border-color: #444 !important;
          }
          input, textarea, select, button {
            background-color:rgb(119, 54, 224) !important;
            color:rgb(162, 168, 214) !important;
            border-color: #555 !important;
          }
        `;}
  
    let styleTag = document.getElementById("custom-theme-style");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "custom-theme-style";
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = css;
}

  
  
  // Reapply the theme when navigating to a new page or loading new content
const observer = new MutationObserver(() => {
    chrome.storage.sync.get("theme", (data) => {
      if (data.theme) {
        applyTheme(data.theme);
      }
    });
  });
  
  // Observe more aggressively for dynamic content changes
  observer.observe(document, { childList: true, subtree: true, attributes: true, characterData: true });
  