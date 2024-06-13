import { ref, onMounted, onUnmounted } from 'vue';
import annyang from 'annyang';

export function useVoiceCommands() {
  const isListening = ref(false);

  const startListening = () => {
    if (annyang) {
      console.log('Starting annyang and setting up commands');
      const commands = {
        'show tps report': () => {
          console.log('Sending "show tps report" command');
          chrome.runtime.sendMessage({ action: 'performCommand', command: 'show tps report' });
        },
        'show me *tag': (tag) => {
          console.log('Sending "show me" command with tag:', tag);
          chrome.runtime.sendMessage({ action: 'performCommand', command: 'show me', tag });
        },
        'calculate :month stats': (month) => {
          console.log('Sending "calculate stats" command with month:', month);
          chrome.runtime.sendMessage({ action: 'performCommand', command: 'calculate stats', month });
        },
        'say hello (to my little) friend': () => {
          console.log('Sending "say hello friend" command');
          chrome.runtime.sendMessage({ action: 'performCommand', command: 'say hello friend' });
        },
        'speak *message': (message) => {
          console.log('Sending "speak" command with message:', message);
          chrome.runtime.sendMessage({ action: 'performCommand', command: 'speak', message });
        }
      };

      annyang.addCommands(commands);
      // annyang.start();
      isListening.value = true;
      console.log('Annyang started');
    }
  };

  const stopListening = () => {
    if (annyang) {
      annyang.abort();
      isListening.value = false;
      console.log('Annyang stopped');
    }
  };

  onMounted(() => {
    startListening();
  });

  onUnmounted(() => {
    stopListening();
  });

  return {
    isListening,
    startListening,
    stopListening
  };
}
