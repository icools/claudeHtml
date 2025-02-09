// sidebar.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "TTS_TEXT" && message.text) {
      const iframe = document.getElementById("ttsFrame");
      iframe.contentWindow.postMessage({ type: "TTS_TEXT", text: message.text }, "*");
    }
  });