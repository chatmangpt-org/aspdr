<template>
  <main>
    <h3>Voice Command Control</h3>
    <div>
      <p v-if="isListening">Listening for commands...</p>
      <p v-else>Voice commands are off.</p>
      <button @click="startListening" v-if="!isListening">Start Listening</button>
      <button @click="stopListening" v-if="isListening">Stop Listening</button>
    </div>
  </main>
</template>

<script setup lang="js">
import { ref } from 'vue';
import { useVoiceCommands } from './useVoiceCommands.js';

const { isListening, startListening, stopListening } = useVoiceCommands();
console.log('Popup component loaded');
</script>

<style>
/* Add any styles you need */
</style>
