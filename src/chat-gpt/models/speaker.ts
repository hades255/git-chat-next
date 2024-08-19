import { Speech } from '../utils';
import { Conversation } from './conversation';

export enum Race {
  HUMAN = 'HUMAN',
  AI = 'AI',
}

export class Speaker {
  readonly race: Race;

  constructor(race: Race) {
    this.race = race;
  }

  speak(content: string, action: string) {
    const speech = {
      speaker: this,
      action: action,
      content: content,
    };
    return speech;
  }

  add(speech: Speech, conversation: Conversation) {
    if (speech.speaker.race === this.race) {
      conversation.add(speech);
      console.log(speech);
   // if (speech.speaker.race === 'HUMAN') {
       if (speech.speaker.race == 'AI') {
        try {
          if (speech.action == 'confirm') {
            const speaker = new Speaker(Race.HUMAN);
            const newSpeech: Speech = {
              speaker: speaker,
              content: 'confirm',
              action: 'human'
            }
            conversation.add(newSpeech);
          }
        } catch(err) {

        }
       }
     }
   }
}
