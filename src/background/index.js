chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in background script:', request);
  if (request.action === 'getInteractiveElements') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log('Sending message to content script to get interactive elements');
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getInteractiveElements' }, (response) => {
        console.log('Received response from content script:', response);
        sendResponse(response);
      });
    });
    return true; // Keeps the message channel open for async response
  } else if (request.action === 'performClick' || request.action === 'performInput') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(`Sending message to content script to ${request.action}`, request);
      chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
        console.log('Received response from content script:', response);
        sendResponse(response);
      });
    });
    return true;
  }
});
