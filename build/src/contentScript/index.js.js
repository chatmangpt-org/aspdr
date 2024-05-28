function getInteractiveElements() {
  console.log('getInteractiveElements called');
  const elements = [];
  document.querySelectorAll('a, button, input, textarea, select').forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      elements.push({
        tagName: element.tagName,
        type: element.type,
        name: element.name,
        id: element.id,
        innerText: element.innerText,
        placeholder: element.placeholder,
        value: element.value,
        xpath: getElementXPath(element)
      });
    }
  });
  console.log('Found elements:', elements);
  return elements;
}

function getElementXPath(element) {
  if (element.id !== '') {
    return `//*[@id="${element.id}"]`;
  }
  if (element === document.body) {
    return '/html/body';
  }
  var ix = 0;
  var siblings = element.parentNode.childNodes;
  for (var i = 0; i < siblings.length; i++) {
    var sibling = siblings[i];
    if (sibling === element) {
      return `${getElementXPath(element.parentNode)}/${element.tagName}[${ix + 1}]`;
    }
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
}

function performClick(xpath) {
  console.log('performClick called with xpath:', xpath);
  const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (element) {
    element.click();
    console.log('Element clicked:', element);
  } else {
    console.log('Element not found for xpath:', xpath);
  }
}

function performInput(xpath, value) {
  console.log('performInput called with xpath:', xpath, 'and value:', value);
  const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (element) {
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    console.log('Element value set:', element);
  } else {
    console.log('Element not found for xpath:', xpath);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in content script:', request);
  if (request.action === 'getInteractiveElements') {
    const elements = getInteractiveElements();
    sendResponse(elements);
  } else if (request.action === 'performClick') {
    performClick(request.xpath);
  } else if (request.action === 'performInput') {
    performInput(request.xpath, request.value);
  }
});
