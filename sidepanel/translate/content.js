// 會在右側清單顯示

  
  // 按下時候會執行的動作
  chrome.contextMenus.onClicked.addListener((data, tab) => {
        chrome.sidePanel.setOptions({ path: "sidepanel.html" });
        const selectionText = data.selectionText;
        if (data.menuItemId === 'define-word') {
            chrome.storage.session.set({ lastWord: selectionText });
        }
        chrome.sidePanel.open({ tabId: tab.id });
  });
  
  // 接收來自content.js的訊息
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      //console.log("Background script received message:", request);
      if (request.action === "contentScriptReady") {
          chrome.runtime.sendMessage({ action: "updateSidePanel", data: request.copiedContent });
      }
  });