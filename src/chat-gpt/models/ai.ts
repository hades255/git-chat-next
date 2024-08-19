import { Renderer } from '../renderer';
import { Conversation } from './conversation';
import { Prompt } from './prompt';
import { Race, Speaker } from './speaker';
import { Temperature } from './temperature';
import { Token } from './token';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

export class AI extends Speaker {
  temperature: Temperature;
  token: Token;
  prompt: Prompt;

  constructor(temp: Temperature, token: Token, prompt: Prompt) {
    super(Race.AI);
    this.temperature = temp;
    this.token = token;
    this.prompt = prompt;
  }

  configure(temperature: Temperature, token: Token, prompt: Prompt) {
    this.temperature = this.temperature.update(temperature);
    this.token = this.token.update(token);
    this.prompt = this.prompt.update(prompt);
  }

  async think(conversation: Conversation) {
    const response = await this.request(this.prompt, conversation, this.token.length, this.temperature.value);
    return response;
  }

  async summarize(conversation: Conversation) {
    const titlePrompt = new Prompt("Summarize the following conversation with a title that doesn't exceed 20 letters.");
    const descriptionPrompt = new Prompt(
      'Read the following conversation, and based on the topic, predict what will be talked about. Then, write a short paragraph that summarizes the conversation.',
    );
    // const title = await this.request(titlePrompt, conversation, this.token.length, 0);
    // const description = await this.request(descriptionPrompt, conversation, this.token.length, 0);
    // conversation.summarize({ title: title.content, description: description.content });
  }

  private async request(prompt: Prompt, conversation: Conversation, tokens: number, temperature: number) {
    // const renderer = new Renderer();
    // const configuration = new Configuration({
    //   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    // });
    // const openai = new OpenAIApi(configuration);
    // const parameters = {
    //   model: 'text-davinci-003',
    //   prompt: renderer.AIPrompt(prompt, conversation),
    //   max_tokens: tokens,
    //   temperature: temperature,
    // };
    // const response = await openai.createCompletion(parameters);
    // if (response.data.choices[0].text) {
    //   return this.speak(response.data.choices[0].text);
    // } else {
    //   throw new Error('There was an error. Please try again.');
    // }
    console.log('conversation', conversation);
    const SERVER_URL = 'http://ec2-3-95-246-150.compute-1.amazonaws.com:3000';

    const lastSpeech = conversation.speeches[conversation.speeches.length - 1];
    let tc_array = JSON.parse(localStorage.getItem('tool_calls') || "[]");
    const response = await axios.post(SERVER_URL, {
      speech: lastSpeech.content,
      tc: tc_array
    })
    const { data } = response;
    if (data.success) {
      const { tc_data, action } = data;
      tc_array.push(tc_data);
      localStorage.setItem('tool_calls', JSON.stringify(tc_array));
      let AIMsg = '';
      if (tc_data.content) {
        AIMsg = tc_data.content;
      } else {
        const argu = tc_data.tool_calls[0].function.arguments;
        const json_argu = JSON.parse(argu);

        if (action == 'confirm') AIMsg = json_argu.response;
        else AIMsg = argu;
      }
      return this.speak(AIMsg, action);
    } else {
      throw new Error('There was an error. Please try again');
    }
  }
}
