'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, User, Bot, Trophy, RotateCcw } from 'lucide-react';

type Player = 'X' | 'O';
type Board = (Player | null)[];
type GameMode = 'pvp' | 'ai';
type Difficulty = 'easy' | 'hard';

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]            // Diagonals
];

export default function TicTacToeGame() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameMode, setGameMode] = useState<GameMode>('ai');
  const [difficulty, setDifficulty] = useState<Difficulty>('hard');
  const [scores, setScores] = useState({ x: 0, o: 0, ties: 0 });
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [winner, setWinner] = useState<Player | 'Tie' | null>(null);

  // Check winner logic
  const checkWinner = (currentBoard: Board) => {
    for (let combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], combo };
      }
    }
    if (currentBoard.every((cell) => cell !== null)) {
      return { winner: 'Tie' as const, combo: null };
    }
    return null;
  };

  // Minimax algorithm for smart AI
  const minimax = (
    tempBoard: Board,
    depth: number,
    isMaximizing: boolean
  ): { score: number; index?: number } => {
    const result = checkWinner(tempBoard);
    if (result) {
      if (result.winner === 'O') return { score: 10 - depth };
      if (result.winner === 'X') return { score: depth - 10 };
      if (result.winner === 'Tie') return { score: 0 };
    }

    const availableIndices = tempBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val): val is number => val !== null);

    if (isMaximizing) {
      let bestScore = -Infinity;
      let bestIndex = availableIndices[0];
      for (let idx of availableIndices) {
        tempBoard[idx] = 'O';
        const sim = minimax(tempBoard, depth + 1, false);
        tempBoard[idx] = null;
        if (sim.score > bestScore) {
          bestScore = sim.score;
          bestIndex = idx;
        }
      }
      return { score: bestScore, index: bestIndex };
    } else {
      let bestScore = Infinity;
      let bestIndex = availableIndices[0];
      for (let idx of availableIndices) {
        tempBoard[idx] = 'X';
        const sim = minimax(tempBoard, depth + 1, true);
        tempBoard[idx] = null;
        if (sim.score < bestScore) {
          bestScore = sim.score;
          bestIndex = idx;
        }
      }
      return { score: bestScore, index: bestIndex };
    }
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.combo);
      updateScores(winResult.winner);
      return;
    }

    setIsXNext(!isXNext);
  };

  // Trigger AI Move
  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !winner) {
      const timer = setTimeout(() => {
        let aiMoveIndex: number | undefined;

        const availableIndices = board
          .map((val, idx) => (val === null ? idx : null))
          .filter((val): val is number => val !== null);

        if (availableIndices.length === 0) return;

        if (difficulty === 'easy') {
          // Random Move
          const randomIndex = Math.floor(Math.random() * availableIndices.length);
          aiMoveIndex = availableIndices[randomIndex];
        } else {
          // Minimax Move
          const result = minimax([...board], 0, true);
          aiMoveIndex = result.index;
        }

        if (aiMoveIndex !== undefined && board[aiMoveIndex] === null) {
          const newBoard = [...board];
          newBoard[aiMoveIndex] = 'O';
          setBoard(newBoard);

          const winResult = checkWinner(newBoard);
          if (winResult) {
            setWinner(winResult.winner);
            setWinningLine(winResult.combo);
            updateScores(winResult.winner);
          } else {
            setIsXNext(true);
          }
        }
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isXNext, gameMode, winner, board, difficulty]);

  const updateScores = (winPlayer: Player | 'Tie') => {
    setScores((prev) => ({
      x: winPlayer === 'X' ? prev.x + 1 : prev.x,
      o: winPlayer === 'O' ? prev.o + 1 : prev.o,
      ties: winPlayer === 'Tie' ? prev.ties + 1 : prev.ties,
    }));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  const resetAll = () => {
    resetGame();
    setScores({ x: 0, o: 0, ties: 0 });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-900 text-white rounded-3xl shadow-2xl max-w-lg mx-auto border border-slate-800">
      {/* Header Controls */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              setGameMode('ai');
              resetGame();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              gameMode === 'ai' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4" /> vs Bot
          </button>
          <button
            onClick={() => {
              setGameMode('pvp');
              resetGame();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              gameMode === 'pvp' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> 2 Players
          </button>
        </div>

        {gameMode === 'ai' && (
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setDifficulty('easy')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                difficulty === 'easy' ? 'bg-emerald-600 text-white' : 'text-slate-400'
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficulty('hard')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                difficulty === 'hard' ? 'bg-purple-600 text-white' : 'text-slate-400'
              }`}
            >
              Impossible
            </button>
          </div>
        )}
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-3 gap-3 w-full mb-6">
        <div className={`p-3 rounded-2xl text-center border transition-all ${isXNext && !winner ? 'bg-blue-950/60 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-slate-800/60 border-slate-700/50'}`}>
          <span className="block text-xs font-semibold text-blue-400">Player X</span>
          <span className="text-2xl font-black text-blue-400">{scores.x}</span>
        </div>
        <div className="p-3 rounded-2xl text-center bg-slate-800/60 border border-slate-700/50">
          <span className="block text-xs font-semibold text-slate-400">Ties</span>
          <span className="text-2xl font-black text-slate-300">{scores.ties}</span>
        </div>
        <div className={`p-3 rounded-2xl text-center border transition-all ${!isXNext && !winner ? 'bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-slate-800/60 border-slate-700/50'}`}>
          <span className="block text-xs font-semibold text-amber-400">
            {gameMode === 'ai' ? 'Bot (O)' : 'Player O'}
          </span>
          <span className="text-2xl font-black text-amber-400">{scores.o}</span>
        </div>
      </div>

      {/* Turn & Status Indicator */}
      <div className="mb-6 h-8 flex items-center justify-center">
        {winner ? (
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg animate-bounce">
            <Trophy className="w-5 h-5" />
            {winner === 'Tie' ? "It's a Draw!" : `${winner === 'X' ? 'Player X' : gameMode === 'ai' ? 'Bot O' : 'Player O'} Wins! 🎉`}
          </div>
        ) : (
          <div className="text-slate-300 font-medium text-sm flex items-center gap-2">
            <span>Current Turn:</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${isXNext ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'}`}>
              {isXNext ? 'X Turn' : 'O Turn'}
            </span>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[320px] aspect-square p-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
        {board.map((cell, index) => {
          const isWinningCell = winningLine?.includes(index);
          return (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={!!cell || !!winner || (gameMode === 'ai' && !isXNext)}
              className={`rounded-xl text-4xl font-extrabold flex items-center justify-center transition-all duration-200 ${
                isWinningCell
                  ? 'bg-emerald-600/30 text-emerald-300 border-2 border-emerald-400 shadow-lg shadow-emerald-500/40 scale-105'
                  : cell === 'X'
                  ? 'bg-slate-800 text-blue-400 border border-blue-500/30 shadow'
                  : cell === 'O'
                  ? 'bg-slate-800 text-amber-400 border border-amber-500/30 shadow'
                  : 'bg-slate-900 hover:bg-slate-800 text-transparent border border-slate-800/80 active:scale-95'
              }`}
            >
              {cell}
            </button>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between w-full mt-6 pt-4 border-t border-slate-800">
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
        >
          <RefreshCw className="w-4 h-4" /> Next Round
        </button>
        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 px-3 py-2 text-slate-400 hover:text-red-400 text-xs font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Scores
        </button>
      </div>
    </div>
  );
}
