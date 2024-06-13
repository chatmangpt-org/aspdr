import annyang from 'annyang';

if (!annyang) {
  console.error('Annyang not loaded');
} else {
  console.log('Annyang loaded successfully');

  const commands = {
    'show tps report': function() {
      console.log('Command recognized: show tps report');
      document.querySelector('#tpsreport').style.bottom = '-100px';
    },
    'show me *tag': showFlickr,
    'calculate :month stats': calculateStats,
    'say hello (to my little) friend': greeting,
    'speak *message': speakMessage
  };

  annyang.addCommands(commands);
  annyang.start();
  console.log('Annyang started and listening for commands');

  function showFlickr(tag) {
    console.log('Showing Flickr images for tag:', tag);
    const url = `http://api.flickr.com/services/rest/?tags=${tag}`;
    fetch(url)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching Flickr data:', error));
  }

  function calculateStats(month) {
    console.log('Calculating stats for:', month);
    document.querySelector('#stats').textContent = `Statistics for ${month}`;
  }

  function greeting() {
    console.log('Saying hello');
    document.querySelector('#greeting').textContent = 'Hello!';
  }

  function speakMessage(message) {
    console.log('Speaking message:', message);
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.onstart = () => console.log('Speech started');
    utterance.onend = () => console.log('Speech ended');
    utterance.onerror = (event) => console.error('Speech error', event);
    window.speechSynthesis.speak(utterance);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in content script:', request);
  if (request.action === 'performCommand') {
    if (request.command === 'speak') {
      console.log('Performing speak command with message:', request.message);
      speakMessage(request.message);
    } else if (request.command === 'show tps report') {
      document.querySelector('#tpsreport').style.bottom = '-100px';
    } else if (request.command === 'show me') {
      showFlickr(request.tag);
    } else if (request.command === 'calculate stats') {
      calculateStats(request.month);
    } else if (request.command === 'say hello friend') {
      greeting();
    }
  }
});
