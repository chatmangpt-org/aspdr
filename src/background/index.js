chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in background script:', request);
  if (request.action === 'performCommand') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log('Sending message to content script:', request);
      chrome.tabs.sendMessage(tabs[0].id, request);
    });
  }
});
