import { ref } from 'vue';

export function useInteractiveElements() {
  const elements = ref([]);

  const getInteractiveElements = () => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getInteractiveElements' }, (response) => {
        elements.value = response || [];
        resolve();
      });
    });
  };

  const triggerElement = (element) => {
    // Logic to trigger the element
    console.log('Triggering element:', element);
  };

  const updateElement = (element) => {
    // Logic to update the element value
    console.log('Updating element:', element);
  };

  return {
    elements,
    getInteractiveElements,
    triggerElement,
    updateElement,
  };
}
