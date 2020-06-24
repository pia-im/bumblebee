import Bumblebee from 'jaxcore-bumblebee';
import { Client } from 'pia/client/Client.js';
import { textPostProcess } from 'pia/speech/recognition/postprocess.js';
import AudioVideoPlayer from 'pia/client/local/MPG123Player.js';
//import AudioVideoPlayer from 'pia/client/local/MPDPlayer.js';

var gPiaClient = null;

class PiaAssistant extends Bumblebee.Assistant {
  // every time the assistant connects to the server, a new instance of the assistant will be created
  constructor() {
    super(...arguments);
  }

  // onHotword is called immediately when the hotword is detected
  async onHotword(hotword) {
    this.bumblebee.console('hotword detected: ' + hotword);
  }

  // onCommand is called when speech-to-text was processed at the same time hotword was detected
  async onCommand(recognition) {
    this.bumblebee.console('command detected: ' + recognition.text);
  }

  // onBegin() is called once when the assistant called upon using a hotword or activated automatically
  async onBegin() {
    await this.bumblebee.say('Hello, I am Pia', {
			replacements: {
				'pee-ah': 'Pia',
			}
		});
    await this.bumblebee.say('How may I help you?');
  }

  // loop() is called repeatedly and waits for speech-to-text recognition events
  async loop() {
    let recognition = await this.bumblebee.recognize();
    let inputText = recognition.text;
    inputText = textPostProcess(inputText);
    console.log('recognition:', inputText);
    this.bumblebee.console(inputText);

    // Call Pia
    let response = await gPiaClient.intentParser.startApp(inputText);

    this.bumblebee.console(response);
    await this.bumblebee.say(response);
  }

  // onStop is called after this.loop() returns, or if this.abort() was called
  async onStop() {
    await this.bumblebee.say('Exiting...');
  }
}


class PiaBumblebeeClient extends Client {
  async load(lang) {
    this._player = new AudioVideoPlayer();
    await super.load(lang);
  }

  get player() {
    return this._player;
  }
}


(async () => {
  try {
    gPiaClient = new PiaBumblebeeClient();
    await gPiaClient.start();
    console.log("Pia started");

    Bumblebee.connectAssistant('hey_edison', PiaAssistant, {
      autoStart: true
    });
  } catch (ex) {
    console.error(ex);
  }
})();
