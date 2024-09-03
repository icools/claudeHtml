function setupContextMenu() {
  chrome.contextMenus.create({
    id: 'groq',
    title: 'GroqTranslate',
    contexts: ['selection']
  });
};

// 加上發音或者送到 Obsidian 
chrome.runtime.onInstalled.addListener(() => {
    setupContextMenu();
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
      const selectionText = data.selectionText;
      if (data.menuItemId === 'groq') {
          chrome.storage.session.set({ lastWord: selectionText });
      }
      chrome.sidePanel.open({ tabId: tab.id });
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
    const { path } = await chrome.sidePanel.getOptions({ tabId });
});

// 接收來自content.js的訊息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "contentScriptReady") {
        chrome.runtime.sendMessage({ action: "updateSidePanel", data: request.copiedContent });
    }
});