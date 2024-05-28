<template>
  <main>
    <h3>Interactive Elements</h3>
    <div v-if="elements.length > 0">
      <div v-for="element in elements" :key="element.id || element.name || element.innerText">
        <div v-if="element.tagName === 'BUTTON' || element.tagName === 'A'">
          <button @click="clickElement(element)">{{ element.distinguishingName }}</button>
        </div>
        <div v-else-if="element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT'">
          <label>{{ element.distinguishingName }}</label>
          <input v-if="element.type !== 'textarea' && element.type !== 'select'" v-model="element.value" @input="inputElement(element)" />
          <textarea v-else-if="element.type === 'textarea'" v-model="element.value" @input="inputElement(element)"></textarea>
          <select v-else v-model="element.value" @change="inputElement(element)">
            <option v-for="option in element.options" :value="option.value">{{ option.innerText }}</option>
          </select>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No interactive elements found on this page.</p>
    </div>
  </main>
</template>

<script setup lang="js">
import { onMounted } from 'vue';
import { useInteractiveElements } from './useInteractiveElements.js';

const { elements, getInteractiveElements, triggerElement, updateElement } = useInteractiveElements();

onMounted(async () => {
  console.log('Popup mounted');
  await getInteractiveElements();
  console.log('Interactive elements loaded:', elements.value);
});

const clickElement = (element) => {
  console.log('Click element called:', element);
  chrome.runtime.sendMessage({ action: 'performClick', xpath: element.xpath });
};

const inputElement = (element) => {
  console.log('Input element called:', element);
  chrome.runtime.sendMessage({ action: 'performInput', xpath: element.xpath, value: element.value });
};
</script>

<style>
/* Add any styles you need */
</style>
