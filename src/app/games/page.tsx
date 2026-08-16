import React from 'react';
import { Metadata } from 'next';
import GameHubClient from './GameHubClient';

export const metadata: Metadata = {
  title: 'Interactive Game Zone & Digital Arcade | Cyber Café Nirakarpur',
  description: 'Play instant free browser games including Tic Tac Toe, Ludo, Snake Arcade, Memory Match, and Connect 4 without any registration, database, or downloads.',
  keywords: ['Tic Tac Toe', 'Ludo online', 'Snake game', 'Memory Card game', 'Connect 4', 'Cyber Cafe Games', 'Nirakarpur Digital Hub'],
};

export default function GamesPage() {
  return <GameHubClient />;
}
