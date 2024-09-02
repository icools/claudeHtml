// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.create({
//     id: "translateText",
//     title: "Translate with Groq",
//     contexts: ["selection"]
//   });
// });

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === "translateText") {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: getSelectedText
//     }, (results) => {
//       if (results && results[0] && results[0].result) {
//         chrome.storage.local.set({ selectedText: results[0].result });
//       }
//     });
//   }
// });

function getSelectedText() {
  return window.getSelection().toString();
}

chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked. Tab ID:", tab.id);
  requestContentFromTab();
});

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });