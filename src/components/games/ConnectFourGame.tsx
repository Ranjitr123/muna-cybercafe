'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy, User, Bot } from 'lucide-react';

const ROWS = 6;
const COLS = 7;

type Player = 'Red' | 'Yellow';
type Board = (Player | null)[][]; // 6 rows x 7 cols

export default function ConnectFourGame() {
  const [board, setBoard] = useState<Board>(() =>
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>('Red');
  const [isVsAi, setIsVsAi] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | 'Tie' | null>(null);
  const [winningCells, setWinningCells] = useState<[number, number][]>([]);
  const [scores, setScores] = useState({ red: 0, yellow: 0 });

  // Drop token into column
  const dropToken = (colIndex: number) => {
    if (winner) return;

    // Find lowest empty row in that column
    let targetRow = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (!board[r][colIndex]) {
        targetRow = r;
        break;
      }
    }

    if (targetRow === -1) return; // Column is full

    const newBoard = board.map((row) => [...row]);
    newBoard[targetRow][colIndex] = currentPlayer;
    setBoard(newBoard);

    const winCheck = checkWin(newBoard, targetRow, colIndex, currentPlayer);
    if (winCheck) {
      setWinner(winCheck.winner);
      setWinningCells(winCheck.cells);
      updateScores(winCheck.winner);
      return;
    }

    // Check tie
    if (newBoard.every((row) => row.every((cell) => cell !== null))) {
      setWinner('Tie');
      return;
    }

    setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
  };

  // AI Drop Handler
  useEffect(() => {
    if (isVsAi && currentPlayer === 'Yellow' && !winner) {
      const timer = setTimeout(() => {
        const availableCols = [];
        for (let c = 0; c < COLS; c++) {
          if (!board[0][c]) availableCols.push(c);
        }

        if (availableCols.length === 0) return;

        // Smart AI check: try to win first, then try to block player
        let chosenCol = availableCols[Math.floor(Math.random() * availableCols.length)];

        // Check if AI can win immediately
        for (let col of availableCols) {
          if (canWinNext(board, col, 'Yellow')) {
            chosenCol = col;
            break;
          }
        }

        // Check if AI needs to block Red win
        if (chosenCol === availableCols[0] || !canWinNext(board, chosenCol, 'Yellow')) {
          for (let col of availableCols) {
            if (canWinNext(board, col, 'Red')) {
              chosenCol = col;
              break;
            }
          }
        }

        dropToken(chosenCol);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, isVsAi, winner, board]);

  const canWinNext = (testBoard: Board, col: number, player: Player): boolean => {
    let targetRow = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (!testBoard[r][col]) {
        targetRow = r;
        break;
      }
    }
    if (targetRow === -1) return false;

    const copy = testBoard.map((row) => [...row]);
    copy[targetRow][col] = player;
    return !!checkWin(copy, targetRow, col, player);
  };

  const checkWin = (
    b: Board,
    r: number,
    c: number,
    p: Player
  ): { winner: Player; cells: [number, number][] } | null => {
    const directions = [
      [[0, 1], [0, -1]],   // Horizontal
      [[1, 0], [-1, 0]],   // Vertical
      [[1, 1], [-1, -1]],  // Diagonal \
      [[1, -1], [-1, 1]],  // Diagonal /
    ];

    for (let dir of directions) {
      const line: [number, number][] = [[r, c]];
      for (let [dr, dc] of dir) {
        let nr = r + dr;
        let nc = c + dc;
        while (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && b[nr][nc] === p) {
          line.push([nr, nc]);
          nr += dr;
          nc += dc;
        }
      }
      if (line.length >= 4) {
        return { winner: p, cells: line };
      }
    }

    return null;
  };

  const updateScores = (winPlayer: Player | 'Tie') => {
    if (winPlayer === 'Red') setScores((prev) => ({ ...prev, red: prev.red + 1 }));
    if (winPlayer === 'Yellow') setScores((prev) => ({ ...prev, yellow: prev.yellow + 1 }));
  };

  const resetGame = () => {
    setBoard(
      Array(ROWS)
        .fill(null)
        .map(() => Array(COLS).fill(null))
    );
    setCurrentPlayer('Red');
    setWinner(null);
    setWinningCells([]);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-900 text-white rounded-3xl shadow-2xl max-w-xl mx-auto border border-slate-800">
      {/* Header controls */}
      <div className="w-full flex items-center justify-between gap-3 mb-6">
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              setIsVsAi(true);
              resetGame();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              isVsAi ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4" /> vs AI
          </button>
          <button
            onClick={() => {
              setIsVsAi(false);
              resetGame();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              !isVsAi ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> 2 Players
          </button>
        </div>

        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-xs font-bold rounded-xl shadow transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Restart Match
        </button>
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-2 gap-4 w-full mb-6">
        <div className={`p-3 rounded-2xl border text-center transition-all ${currentPlayer === 'Red' && !winner ? 'bg-red-950/60 border-red-500 shadow-lg shadow-red-500/20' : 'bg-slate-800/60 border-slate-700/50'}`}>
          <span className="block text-xs font-bold text-red-400">Red Player</span>
          <span className="text-2xl font-black text-red-400">{scores.red}</span>
        </div>
        <div className={`p-3 rounded-2xl border text-center transition-all ${currentPlayer === 'Yellow' && !winner ? 'bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-slate-800/60 border-slate-700/50'}`}>
          <span className="block text-xs font-bold text-amber-400">
            {isVsAi ? 'Yellow (AI Bot)' : 'Yellow Player'}
          </span>
          <span className="text-2xl font-black text-amber-400">{scores.yellow}</span>
        </div>
      </div>

      {/* Turn & Winner announcement */}
      <div className="mb-6 h-8 flex items-center justify-center">
        {winner ? (
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-lg animate-bounce">
            <Trophy className="w-5 h-5 text-amber-400" />
            {winner === 'Tie' ? "It's a Draw!" : `${winner} Player Wins Connect 4! 🎉`}
          </div>
        ) : (
          <div className="text-slate-300 font-medium text-sm flex items-center gap-2">
            <span>Turn:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${currentPlayer === 'Red' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'}`}>
              {currentPlayer} Turn
            </span>
          </div>
        )}
      </div>

      {/* Connect Four Board Grid */}
      <div className="p-3 bg-blue-900 rounded-3xl border-4 border-blue-700 shadow-2xl w-full max-w-[420px]">
        {/* Column Drop Buttons */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {Array.from({ length: COLS }).map((_, colIdx) => (
            <button
              key={colIdx}
              onClick={() => dropToken(colIdx)}
              disabled={!!winner || !!board[0][colIdx] || (isVsAi && currentPlayer === 'Yellow')}
              className="py-1 bg-blue-800 hover:bg-blue-600 disabled:opacity-30 text-blue-200 font-bold text-xs rounded-lg transition-all active:scale-95"
            >
              ↓
            </button>
          ))}
        </div>

        {/* Board Slots */}
        <div className="grid grid-cols-7 gap-2">
          {board.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              const isWinning = winningCells.some(([wr, wc]) => wr === rIdx && wc === cIdx);

              return (
                <button
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => dropToken(cIdx)}
                  disabled={!!winner || !!board[0][cIdx] || (isVsAi && currentPlayer === 'Yellow')}
                  className={`aspect-square rounded-full flex items-center justify-center transition-all duration-300 transform ${
                    isWinning
                      ? 'ring-4 ring-emerald-400 animate-pulse scale-105'
                      : ''
                  } ${
                    cell === 'Red'
                      ? 'bg-gradient-to-tr from-red-600 to-red-400 shadow-inner shadow-black/40'
                      : cell === 'Yellow'
                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-inner shadow-black/40'
                      : 'bg-slate-950/80 hover:bg-slate-900 border border-blue-950/50 shadow-inner'
                  }`}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
