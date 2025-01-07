// Add event listeners for Light Theme and Dark Theme buttons
document.getElementById("light-theme").addEventListener("click", () => {
    setTheme("light");
  });
  
  document.getElementById("dark-theme").addEventListener("click", () => {
    setTheme("dark");
  });
  
  // Function to save the theme and send it to the content script
  function setTheme(theme) {
    chrome.storage.sync.set({ theme }, () => {
      console.log(`Theme set to: ${theme}`);
      sendMessageToContentScript(theme);
    });
  }
  
  // Send a message to the content script with the selected theme
  function sendMessageToContentScript(theme) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "setTheme", theme });
    });
  }
  