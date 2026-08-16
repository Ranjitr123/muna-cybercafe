'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, Trophy, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const GRID_SIZE = 20; // 20x20 Grid
const INITIAL_SPEED = 140; // ms per tick

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('UP');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);

  const directionRef = useRef<Direction>(direction);
  directionRef.current = direction;

  // Load High Score on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snake_high_score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Generate random food spot
  const generateFood = (currentSnake: Position[]): Position => {
    let newFood: Position;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!isOnSnake) break;
    }
    return newFood;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code) && directionRef.current !== 'DOWN') {
        setDirection('UP');
      } else if (['ArrowDown', 'KeyS'].includes(e.code) && directionRef.current !== 'UP') {
        setDirection('DOWN');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code) && directionRef.current !== 'RIGHT') {
        setDirection('LEFT');
      } else if (['ArrowRight', 'KeyD'].includes(e.code) && directionRef.current !== 'LEFT') {
        setDirection('RIGHT');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const gameInterval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };

        switch (directionRef.current) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check Wall Collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          handleGameOver();
          return prevSnake;
        }

        // Check Self Collision
        if (prevSnake.some((seg) => seg.x === head.x && seg.y === head.y)) {
          handleGameOver();
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check Food Collision
        if (head.x === food.x && head.y === food.y) {
          const newScore = score + 10;
          setScore(newScore);
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('snake_high_score', newScore.toString());
          }
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameInterval);
  }, [isPlaying, isGameOver, food, score, highScore, speed]);

  const handleGameOver = () => {
    setIsGameOver(true);
    setIsPlaying(false);
  };

  const startGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ]);
    setDirection('UP');
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
    setFood(generateFood([{ x: 10, y: 10 }]));
  };

  const handleDirectionChange = (newDir: Direction) => {
    if (newDir === 'UP' && directionRef.current !== 'DOWN') setDirection('UP');
    if (newDir === 'DOWN' && directionRef.current !== 'UP') setDirection('DOWN');
    if (newDir === 'LEFT' && directionRef.current !== 'RIGHT') setDirection('LEFT');
    if (newDir === 'RIGHT' && directionRef.current !== 'LEFT') setDirection('RIGHT');
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-900 text-white rounded-3xl shadow-2xl max-w-md mx-auto border border-slate-800">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Score</span>
            <span className="text-2xl font-black text-white">{score}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
          <Trophy className="w-4 h-4 text-amber-400" />
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block">Best</span>
            <span className="text-xs font-bold text-amber-300">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Speed Controls */}
      <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 mb-4 text-xs">
        <button
          onClick={() => setSpeed(160)}
          className={`px-3 py-1 font-semibold rounded-lg transition-all ${
            speed === 160 ? 'bg-brand-600 text-white' : 'text-slate-400'
          }`}
        >
          Normal
        </button>
        <button
          onClick={() => setSpeed(110)}
          className={`px-3 py-1 font-semibold rounded-lg transition-all ${
            speed === 110 ? 'bg-brand-600 text-white' : 'text-slate-400'
          }`}
        >
          Fast
        </button>
        <button
          onClick={() => setSpeed(70)}
          className={`px-3 py-1 font-semibold rounded-lg transition-all ${
            speed === 70 ? 'bg-purple-600 text-white' : 'text-slate-400'
          }`}
        >
          Hyper
        </button>
      </div>

      {/* Game Canvas / Grid Container */}
      <div className="relative w-full aspect-square max-w-[320px] bg-slate-950 rounded-2xl border-2 border-slate-800 shadow-inner overflow-hidden flex items-center justify-center">
        {/* Snake & Food Renderer */}
        <div
          className="w-full h-full grid gap-[1px] bg-slate-900/50 p-1"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
            const x = idx % GRID_SIZE;
            const y = Math.floor(idx / GRID_SIZE);

            const isHead = snake[0].x === x && snake[0].y === y;
            const isBody = snake.slice(1).some((seg) => seg.x === x && seg.y === y);
            const isFoodItem = food.x === x && food.y === y;

            return (
              <div
                key={idx}
                className={`rounded-sm transition-all ${
                  isHead
                    ? 'bg-emerald-400 shadow-md shadow-emerald-400/50 scale-105 rounded'
                    : isBody
                    ? 'bg-emerald-600/90'
                    : isFoodItem
                    ? 'bg-red-500 animate-pulse rounded-full shadow-lg shadow-red-500/50 scale-110'
                    : 'bg-slate-950/40'
                }`}
              />
            );
          })}
        </div>

        {/* Overlay when Not Playing */}
        {(!isPlaying || isGameOver) && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            {isGameOver ? (
              <>
                <h3 className="text-2xl font-black text-red-400 mb-1">Game Over!</h3>
                <p className="text-slate-300 text-sm mb-4">Final Score: <strong className="text-emerald-400">{score}</strong></p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white mb-2">Retro Snake Arcade</h3>
                <p className="text-slate-400 text-xs mb-4">Use keyboard Arrow keys or on-screen D-Pad controls to navigate.</p>
              </>
            )}

            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-brand-600 hover:from-emerald-500 hover:to-brand-500 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 text-sm"
            >
              {isGameOver ? <RefreshCw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isGameOver ? 'Play Again' : 'Start Snake Game'}</span>
            </button>
          </div>
        )}
      </div>

      {/* On-screen Touch D-Pad for Mobile */}
      <div className="mt-6 flex flex-col items-center gap-1.5 w-full max-w-[200px]">
        <button
          onClick={() => handleDirectionChange('UP')}
          disabled={!isPlaying}
          className="p-3 bg-slate-800 hover:bg-slate-700 active:bg-brand-600 rounded-xl border border-slate-700 transition-all text-slate-300 disabled:opacity-40"
          aria-label="Up"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => handleDirectionChange('LEFT')}
            disabled={!isPlaying}
            className="p-3 bg-slate-800 hover:bg-slate-700 active:bg-brand-600 rounded-xl border border-slate-700 transition-all text-slate-300 disabled:opacity-40"
            aria-label="Left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={isGameOver}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 text-slate-400 text-xs font-bold"
            title={isPlaying ? 'Pause' : 'Resume'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>
          <button
            onClick={() => handleDirectionChange('RIGHT')}
            disabled={!isPlaying}
            className="p-3 bg-slate-800 hover:bg-slate-700 active:bg-brand-600 rounded-xl border border-slate-700 transition-all text-slate-300 disabled:opacity-40"
            aria-label="Right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <button
          onClick={() => handleDirectionChange('DOWN')}
          disabled={!isPlaying}
          className="p-3 bg-slate-800 hover:bg-slate-700 active:bg-brand-600 rounded-xl border border-slate-700 transition-all text-slate-300 disabled:opacity-40"
          aria-label="Down"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
