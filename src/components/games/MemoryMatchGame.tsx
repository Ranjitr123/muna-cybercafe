'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy } from 'lucide-react';

const EMOJI_POOL = ['🎮', '⚡', '🚀', '🏆', '🎯', '💻', '🎨', '📱', '🤖', '🛡️', '🔑', '🌟'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

type Difficulty = 'easy' | 'medium' | 'hard';

const GRID_CONFIG: Record<Difficulty, { pairs: number; cols: string }> = {
  easy: { pairs: 6, cols: 'grid-cols-4' },
  medium: { pairs: 8, cols: 'grid-cols-4' },
  hard: { pairs: 12, cols: 'grid-cols-4 sm:grid-cols-6' },
};

export default function MemoryMatchGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [bestMoves, setBestMoves] = useState<number | null>(null);

  // Initialize Game Board
  const initializeGame = (diff: Difficulty = difficulty) => {
    const config = GRID_CONFIG[diff];
    const selectedEmojis = EMOJI_POOL.slice(0, config.pairs);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];

    // Shuffle Array
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }

    const initialCards: Card[] = cardPairs.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(initialCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setTimer(0);
    setIsActive(false);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame(difficulty);
    const savedBest = localStorage.getItem(`memory_best_${difficulty}`);
    if (savedBest) setBestMoves(parseInt(savedBest, 10));
  }, [difficulty]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !isWon) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isWon]);

  // Handle Card Click
  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return; // Block clicks during flip check
    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    if (!isActive) setIsActive(true);

    const updatedCards = cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(updatedCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);
          setMatchedPairs((prev) => {
            const nextPairs = prev + 1;
            if (nextPairs === GRID_CONFIG[difficulty].pairs) {
              handleWin(moves + 1);
            }
            return nextPairs;
          });
        }, 300);
      } else {
        // No match, flip back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  const handleWin = (finalMoves: number) => {
    setIsWon(true);
    setIsActive(false);
    if (!bestMoves || finalMoves < bestMoves) {
      setBestMoves(finalMoves);
      localStorage.setItem(`memory_best_${difficulty}`, finalMoves.toString());
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-900 text-white rounded-3xl shadow-2xl max-w-lg mx-auto border border-slate-800">
      {/* Header controls */}
      <div className="w-full flex items-center justify-between gap-3 mb-6">
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`capitalize px-3 py-1 font-bold rounded-lg transition-all ${
                difficulty === d ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <button
          onClick={() => initializeGame()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 w-full mb-6 text-center">
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Moves</span>
          <span className="text-xl font-black text-brand-400">{moves}</span>
        </div>
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Time</span>
          <span className="text-xl font-black text-emerald-400">{formatTime(timer)}</span>
        </div>
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Matched</span>
          <span className="text-xl font-black text-amber-400">
            {matchedPairs}/{GRID_CONFIG[difficulty].pairs}
          </span>
        </div>
      </div>

      {/* Win Banner */}
      {isWon && (
        <div className="w-full mb-6 p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center gap-2 text-center animate-bounce">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-lg">
            <Trophy className="w-6 h-6 text-amber-400" /> Great Memory! Puzzle Completed!
          </div>
          <p className="text-xs text-emerald-200">
            Solved in <strong>{moves} moves</strong> and <strong>{formatTime(timer)}</strong>!
          </p>
        </div>
      )}

      {/* Card Grid */}
      <div className={`grid ${GRID_CONFIG[difficulty].cols} gap-3 w-full p-2`}>
        {cards.map((card) => {
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched || isWon}
              className={`aspect-square rounded-2xl text-3xl sm:text-4xl flex items-center justify-center transition-all duration-300 transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-slate-800 border-2 border-brand-500/50 shadow-lg shadow-brand-500/10 scale-100 rotate-0'
                  : 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 hover:border-slate-500 active:scale-95 shadow cursor-pointer hover:scale-105'
              }`}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '❓'}
            </button>
          );
        })}
      </div>

      {bestMoves !== null && (
        <div className="mt-6 text-xs text-slate-400 flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Best Score ({difficulty}): <strong>{bestMoves} moves</strong></span>
        </div>
      )}
    </div>
  );
}
