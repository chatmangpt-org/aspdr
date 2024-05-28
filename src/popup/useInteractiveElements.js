import { ref } from 'vue';

function getDistinguishingName(element) {
  if (element.id) return element.id;
  if (element.name) return element.name;
  if (element.placeholder) return element.placeholder;
  if (element.innerText) return element.innerText.trim();
  return 'Unnamed Element';
}

export function useInteractiveElements() {
  const elements = ref([]);

  const getInteractiveElements = () => {
    return new Promise((resolve) => {
      console.log('Requesting interactive elements from background script');
      chrome.runtime.sendMessage({ action: 'getInteractiveElements' }, (response) => {
        console.log('Received interactive elements from background script:', response);
        elements.value = response.map(element => ({
          ...element,
          distinguishingName: getDistinguishingName(element)
        }));
        resolve();
      });
    });
  };

  const triggerElement = (element) => {
    console.log('Trigger element:', element);
  };

  const updateElement = (element) => {
    console.log('Update element:', element);
  };

  return {
    elements,
    getInteractiveElements,
    triggerElement,
    updateElement,
  };
}
