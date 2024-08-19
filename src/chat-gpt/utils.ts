import { Speaker } from './models/speaker';

export interface Speech {
  speaker: Speaker;
  content: string;
  action: string;
}

export interface Summary {
  title: string;
  description: string;
}

export interface Action {
  type: string;
  action: string;
  amount: string;
  currency: string;
  walletAddress: string;
}