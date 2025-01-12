document.getElementById("light-theme").addEventListener("click", () => {
    console.log("Light theme button clicked"); // Debug line
    setTheme("light");
  });
  
  document.getElementById("dark-theme").addEventListener("click", () => {
    console.log("Dark theme button clicked"); // Debug line
    setTheme("dark");
  });
  
  function setTheme(theme) {
    console.log("Sending theme to content script:", theme); // Debug line
    chrome.storage.sync.set({ theme }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "setTheme", theme });
      });
    });
  }
  