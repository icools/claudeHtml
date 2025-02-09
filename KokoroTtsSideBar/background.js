// background.js

// Extension 安裝或更新時建立右鍵選單
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "sendToTTS",
      title: "傳送文字至 TTS 播放器",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendToTTS" && info.selectionText) {
      chrome.runtime.sendMessage({ type: "TTS_TEXT", text: info.selectionText }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("訊息發送失敗：", chrome.runtime.lastError.message);
        } else {
          console.log("訊息發送成功！");
        }
      });
    }
  });