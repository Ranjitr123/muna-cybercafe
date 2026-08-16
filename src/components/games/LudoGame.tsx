'use client';

import React, { useState, useEffect } from 'react';
import { Dices, RefreshCw, Trophy, User, Bot } from 'lucide-react';

type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';

interface Token {
  id: number;
  color: PlayerColor;
  position: number; // -1: In Base, 0-51: Main Track, 100+: Home Stretch, 999: Reached Home
}

const PLAYER_COLORS: PlayerColor[] = ['red', 'green', 'yellow', 'blue'];

const COLOR_MAP: Record<PlayerColor, { bg: string; border: string; text: string; lightBg: string; name: string }> = {
  red: { bg: 'bg-red-600', border: 'border-red-500', text: 'text-red-400', lightBg: 'bg-red-500/20', name: 'Red' },
  green: { bg: 'bg-emerald-600', border: 'border-emerald-500', text: 'text-emerald-400', lightBg: 'bg-emerald-500/20', name: 'Green' },
  yellow: { bg: 'bg-amber-500', border: 'border-amber-400', text: 'text-amber-400', lightBg: 'bg-amber-500/20', name: 'Yellow' },
  blue: { bg: 'bg-blue-600', border: 'border-blue-500', text: 'text-blue-400', lightBg: 'bg-blue-500/20', name: 'Blue' },
};

// Starting track positions for each player
const START_POSITIONS: Record<PlayerColor, number> = {
  red: 0,
  green: 13,
  yellow: 26,
  blue: 39,
};

export default function LudoGame() {
  const [numPlayers, setNumPlayers] = useState<number>(2); // 2 or 4 players
  const [isVsAi, setIsVsAi] = useState<boolean>(true);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [hasRolled, setHasRolled] = useState<boolean>(false);
  const [winner, setWinner] = useState<PlayerColor | null>(null);
  const [tokens, setTokens] = useState<Token[]>(() => {
    return PLAYER_COLORS.flatMap((color) =>
      [1, 2, 3, 4].map((id) => ({
        id,
        color,
        position: -1, // in base
      }))
    );
  });

  const activePlayers = PLAYER_COLORS.slice(0, numPlayers);
  const curPlayerColor = activePlayers[currentPlayerIdx];

  // Roll the dice
  const rollDice = () => {
    if (isRolling || hasRolled || winner) return;

    setIsRolling(true);
    let rolls = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rolls++;
      if (rolls >= 8) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalVal);
        setIsRolling(false);
        setHasRolled(true);

        // Check if player has valid moves
        const validTokens = getMovableTokens(curPlayerColor, finalVal);
        if (validTokens.length === 0) {
          // Pass turn after brief pause
          setTimeout(() => {
            nextTurn(finalVal === 6);
          }, 800);
        }
      }
    }, 60);
  };

  // Get movable tokens
  const getMovableTokens = (color: PlayerColor, roll: number): Token[] => {
    return tokens.filter((t) => {
      if (t.color !== color) return false;
      if (t.position === 999) return false; // Already finished
      if (t.position === -1) return roll === 6; // Needs a 6 to enter
      return true;
    });
  };

  // Move token logic
  const moveToken = (tokenToMove: Token) => {
    if (!hasRolled || !diceValue || tokenToMove.color !== curPlayerColor) return;

    const movable = getMovableTokens(curPlayerColor, diceValue);
    if (!movable.some((t) => t.id === tokenToMove.id)) return;

    let newPosition = tokenToMove.position;

    if (tokenToMove.position === -1) {
      if (diceValue === 6) {
        newPosition = START_POSITIONS[curPlayerColor];
      }
    } else {
      // Calculate steps
      const startPos = START_POSITIONS[curPlayerColor];
      let stepsTaken = (tokenToMove.position - startPos + 52) % 52;
      if (stepsTaken + diceValue >= 51) {
        // Enters home stretch or reaches home
        const homeSteps = stepsTaken + diceValue - 51;
        if (homeSteps === 6) {
          newPosition = 999; // Reached home!
        } else if (homeSteps < 6) {
          newPosition = 100 + homeSteps;
        } else {
          // Overshoot, invalid move
          return;
        }
      } else {
        newPosition = (tokenToMove.position + diceValue) % 52;
      }
    }

    // Update token
    setTokens((prev) => {
      const updated = prev.map((t) => {
        if (t.color === tokenToMove.color && t.id === tokenToMove.id) {
          return { ...t, position: newPosition };
        }
        // Capture opponent token if landing on same position on main track (and not a safe spot)
        if (
          newPosition >= 0 &&
          newPosition < 52 &&
          t.position === newPosition &&
          t.color !== curPlayerColor
        ) {
          return { ...t, position: -1 }; // Send back to base!
        }
        return t;
      });

      // Check win condition
      const playerTokens = updated.filter((t) => t.color === curPlayerColor);
      if (playerTokens.every((t) => t.position === 999)) {
        setWinner(curPlayerColor);
      }

      return updated;
    });

    // Pass turn (unless rolled 6)
    nextTurn(diceValue === 6);
  };

  const nextTurn = (rolledSix: boolean) => {
    setHasRolled(false);
    setDiceValue(null);
    if (!rolledSix) {
      setCurrentPlayerIdx((prev) => (prev + 1) % numPlayers);
    }
  };

  // AI Turn handler
  useEffect(() => {
    if (isVsAi && curPlayerColor !== 'red' && !winner) {
      if (!hasRolled && !isRolling) {
        const timer = setTimeout(() => {
          rollDice();
        }, 600);
        return () => clearTimeout(timer);
      } else if (hasRolled && diceValue) {
        const timer = setTimeout(() => {
          const movable = getMovableTokens(curPlayerColor, diceValue);
          if (movable.length > 0) {
            // AI prefers moving token out of base or closest to home
            const bestToken = movable.sort((a, b) => b.position - a.position)[0];
            moveToken(bestToken);
          } else {
            nextTurn(false);
          }
        }, 700);
        return () => clearTimeout(timer);
      }
    }
  }, [currentPlayerIdx, hasRolled, isRolling, diceValue, isVsAi, winner]);

  const resetGame = () => {
    setTokens(
      PLAYER_COLORS.flatMap((color) =>
        [1, 2, 3, 4].map((id) => ({
          id,
          color,
          position: -1,
        }))
      )
    );
    setCurrentPlayerIdx(0);
    setDiceValue(null);
    setHasRolled(false);
    setIsRolling(false);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-900 text-white rounded-3xl shadow-2xl max-w-xl mx-auto border border-slate-800">
      {/* Game Mode Controls */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-6">
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
            <Bot className="w-4 h-4" /> vs Bot
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
            <User className="w-4 h-4" /> Pass & Play
          </button>
        </div>

        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              setNumPlayers(2);
              resetGame();
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              numPlayers === 2 ? 'bg-blue-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            2 Players
          </button>
          <button
            onClick={() => {
              setNumPlayers(4);
              resetGame();
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              numPlayers === 4 ? 'bg-purple-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            4 Players
          </button>
        </div>
      </div>

      {/* Turn Banner */}
      <div className="w-full mb-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${COLOR_MAP[curPlayerColor].bg} animate-pulse shadow-md`} />
          <div>
            <span className="text-xs text-slate-400 block font-medium">Current Turn</span>
            <strong className={`text-base font-extrabold ${COLOR_MAP[curPlayerColor].text}`}>
              {COLOR_MAP[curPlayerColor].name} Player {isVsAi && curPlayerColor !== 'red' ? '(AI Bot)' : ''}
            </strong>
          </div>
        </div>

        {/* Dice Roller Button */}
        <button
          onClick={rollDice}
          disabled={isRolling || hasRolled || (isVsAi && curPlayerColor !== 'red') || !!winner}
          className={`flex items-center gap-3 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg active:scale-95 ${
            hasRolled
              ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-brand-600/30'
          }`}
        >
          <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
          <span>{isRolling ? 'Rolling...' : diceValue ? `Rolled: ${diceValue}` : 'Roll Dice'}</span>
        </button>
      </div>

      {/* Winner Modal Banner */}
      {winner && (
        <div className="w-full mb-6 p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl flex items-center justify-center gap-3 text-emerald-300 font-bold animate-bounce">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <span>Champion! {COLOR_MAP[winner].name} Player Has Won The Match! 🎉</span>
        </div>
      )}

      {/* Ludo Players Status Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-6">
        {activePlayers.map((color) => {
          const colorTokens = tokens.filter((t) => t.color === color);
          const homeCount = colorTokens.filter((t) => t.position === 999).length;
          const isTurn = curPlayerColor === color && !winner;

          return (
            <div
              key={color}
              className={`p-3 rounded-2xl border transition-all ${
                isTurn
                  ? `${COLOR_MAP[color].lightBg} ${COLOR_MAP[color].border} shadow-lg shadow-black/40 ring-1 ring-${color}-400`
                  : 'bg-slate-800/60 border-slate-700/50 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold ${COLOR_MAP[color].text}`}>
                  {COLOR_MAP[color].name}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 font-semibold">
                  {homeCount}/4 Home
                </span>
              </div>

              {/* Tokens status */}
              <div className="flex items-center justify-around gap-1 pt-1">
                {colorTokens.map((t) => {
                  const isMovable =
                    isTurn &&
                    hasRolled &&
                    diceValue &&
                    getMovableTokens(color, diceValue).some((mt) => mt.id === t.id);

                  return (
                    <button
                      key={t.id}
                      onClick={() => moveToken(t)}
                      disabled={!isMovable}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                        t.position === 999
                          ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 scale-90'
                          : t.position === -1
                          ? `${COLOR_MAP[color].bg} text-white opacity-60 border border-white/20`
                          : `${COLOR_MAP[color].bg} text-white shadow-md border-2 border-white`
                      } ${
                        isMovable
                          ? 'animate-bounce ring-4 ring-yellow-400 cursor-pointer scale-110'
                          : 'cursor-default'
                      }`}
                      title={t.position === -1 ? 'In Base (Needs 6)' : t.position === 999 ? 'Reached Home' : `On Track Spot ${t.position}`}
                    >
                      {t.position === 999 ? '✓' : t.position === -1 ? 'B' : t.id}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Track Summary & Guidance */}
      <div className="w-full p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-between text-slate-300 font-semibold">
          <span>Game Rules & Tips:</span>
          <span className="text-brand-400 font-bold text-[11px]">Roll 6 to exit Base!</span>
        </div>
        <p className="leading-relaxed">
          Tap <strong>Roll Dice</strong> on your turn. When your token highlights in gold, tap it to advance across the track. Land on opponents to send them back to base!
        </p>
      </div>

      {/* Reset */}
      <div className="w-full mt-6 pt-4 border-t border-slate-800 flex justify-end">
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all border border-slate-700"
        >
          <RefreshCw className="w-4 h-4" /> Restart Ludo Match
        </button>
      </div>
    </div>
  );
}
