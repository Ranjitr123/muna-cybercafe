'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TicTacToeGame from '@/components/games/TicTacToeGame';
import LudoGame from '@/components/games/LudoGame';
import SnakeGame from '@/components/games/SnakeGame';
import MemoryMatchGame from '@/components/games/MemoryMatchGame';
import ConnectFourGame from '@/components/games/ConnectFourGame';
import { Gamepad2, Sparkles, Trophy, Users, ShieldCheck, Play, Zap, Grid, Swords, Brain } from 'lucide-react';

type GameId = 'tictactoe' | 'ludo' | 'snake' | 'memory' | 'connect4';

interface GameInfo {
  id: GameId;
  name: string;
  category: 'Board' | 'Arcade' | 'Puzzle' | 'Strategy';
  players: string;
  description: string;
  icon: string;
  gradient: string;
  badge: string;
  component: React.ReactNode;
}

const GAMES: GameInfo[] = [
  {
    id: 'tictactoe',
    name: 'Tic-Tac-Toe',
    category: 'Strategy',
    players: '1 - 2 Players',
    description: 'Classic 3x3 grid strategy game. Play pass-and-play with a friend or test your skills against smart AI.',
    icon: '❌⭕',
    gradient: 'from-blue-600 to-cyan-500',
    badge: 'Popular',
    component: <TicTacToeGame />,
  },
  {
    id: 'ludo',
    name: 'Mini Ludo Classic',
    category: 'Board',
    players: '2 - 4 Players',
    description: 'Classic 4-color board game. Roll the dice, move your pawns, send opponents back to base, and reach Home!',
    icon: '🎲',
    gradient: 'from-purple-600 to-pink-500',
    badge: 'Multiplayer',
    component: <LudoGame />,
  },
  {
    id: 'snake',
    name: 'Retro Snake Arcade',
    category: 'Arcade',
    players: '1 Player',
    description: 'Classic retro snake game. Eat food, grow longer, avoid walls and your own tail! Mobile D-Pad included.',
    icon: '🐍',
    gradient: 'from-emerald-600 to-teal-500',
    badge: 'Retro Favorite',
    component: <SnakeGame />,
  },
  {
    id: 'memory',
    name: 'Memory Card Match',
    category: 'Puzzle',
    players: '1 Player',
    description: 'Test your brain and memory! Flip matching emoji cards in fewest moves and fastest time.',
    icon: '🧠',
    gradient: 'from-amber-500 to-orange-500',
    badge: 'Brain Booster',
    component: <MemoryMatchGame />,
  },
  {
    id: 'connect4',
    name: 'Connect Four',
    category: 'Strategy',
    players: '1 - 2 Players',
    description: 'Drop disc strategy game. Align 4 discs vertically, horizontally, or diagonally to win the match!',
    icon: '🔴🟡',
    gradient: 'from-indigo-600 to-blue-600',
    badge: 'Strategy',
    component: <ConnectFourGame />,
  },
];

export default function GameHubClient() {
  const [activeGameId, setActiveGameId] = useState<GameId>('tictactoe');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const activeGame = GAMES.find((g) => g.id === activeGameId) || GAMES[0];

  const categories = ['All', 'Board', 'Arcade', 'Puzzle', 'Strategy'];

  const filteredGames = GAMES.filter(
    (g) => selectedCategory === 'All' || g.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      <Header />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-navy-900 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Instant Play • Zero Storage • No Registration Required</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
            Cyber Café <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-blue-400 to-indigo-300">Game Zone</span> & Arcade
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Enjoy instant browser mini-games right here! Play Tic-Tac-Toe, Ludo, Snake, Memory Match, and Connect Four with friends or against AI bots without any downloads or database setup.
          </p>

          {/* Quick Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <Zap className="w-4 h-4 text-yellow-400" /> 100% In-Browser Play
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <Users className="w-4 h-4 text-brand-400" /> Pass & Play Multiplayer
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> AI Bot Support
            </span>
          </div>
        </div>
      </section>

      {/* Main Game Hub Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        
        {/* Game Selector Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-brand-400" /> Choose Your Game
            </h2>
            <p className="text-slate-400 text-xs mt-1">Select a game card below to start playing immediately.</p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-bold rounded-xl transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Game Cards Carousel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredGames.map((game) => {
            const isActive = game.id === activeGameId;
            return (
              <button
                key={game.id}
                onClick={() => setActiveGameId(game.id)}
                className={`group relative p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900 border-brand-500 shadow-xl shadow-brand-500/20 ring-2 ring-brand-500/50 scale-[1.02]'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl p-2 rounded-xl bg-slate-800/80 border border-slate-700 shadow-inner">
                      {game.icon}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {game.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-brand-300 transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2 mt-1.5 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold">{game.players}</span>
                  <span className={`font-bold flex items-center gap-1 ${isActive ? 'text-brand-400' : 'text-slate-400'}`}>
                    <Play className="w-3 h-3 fill-current" /> {isActive ? 'Playing' : 'Play'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Game Display Area */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeGame.icon}</span>
                <div>
                  <h2 className="text-2xl font-black text-white">{activeGame.name}</h2>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 font-semibold text-brand-300">
                      {activeGame.category}
                    </span>
                    <span>•</span>
                    <span>{activeGame.players}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Instant High Score Tracking</span>
            </div>
          </div>

          {/* Render Active Game Component */}
          <div className="py-2">
            {activeGame.component}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
