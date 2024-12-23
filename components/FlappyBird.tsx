import React, { useState, useEffect, useCallback } from 'react'

const GAME_WIDTH = 288
const GAME_HEIGHT = 512
const GRAVITY = 0.5
const JUMP_STRENGTH = 7
const PIPE_WIDTH = 52
const PIPE_GAP = 100
const PIPE_SPEED = 2

interface Pipe {
  x: number
  topHeight: number
}

const Bird: React.FC<{ y: number }> = ({ y }) => (
  <div
    className="absolute w-8 h-8 bg-yellow-400 rounded-full"
    style={{ left: 50, top: y }}
  />
)

const Pipe: React.FC<{ x: number; topHeight: number }> = ({ x, topHeight }) => (
  <>
    <div
      className="absolute bg-green-500"
      style={{ left: x, top: 0, width: PIPE_WIDTH, height: topHeight }}
    />
    <div
      className="absolute bg-green-500"
      style={{
        left: x,
        top: topHeight + PIPE_GAP,
        width: PIPE_WIDTH,
        height: GAME_HEIGHT - topHeight - PIPE_GAP,
      }}
    />
  </>
)

export default function FlappyBird() {
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2)
  const [birdVelocity, setBirdVelocity] = useState(0)
  const [pipes, setPipes] = useState<Pipe[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [timer, setTimer] = useState(0)

  const jump = useCallback(() => {
    if (!gameOver) {
      setBirdVelocity(-JUMP_STRENGTH)
    } else {
      // Reset game
      setBirdY(GAME_HEIGHT / 2)
      setBirdVelocity(0)
      setPipes([])
      setScore(0)
      setGameOver(false)
      setTimer(0)
    }
  }, [gameOver])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        jump()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [jump])

  useEffect(() => {
    if (gameOver) return

    const gameLoop = setInterval(() => {
      setBirdY((y) => Math.max(0, Math.min(y + birdVelocity, GAME_HEIGHT - 32)))
      setBirdVelocity((v) => v + GRAVITY)

      setPipes((currentPipes) => {
        let newPipes = currentPipes.map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED }))

        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - 200) {
          newPipes.push({
            x: GAME_WIDTH,
            topHeight: Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50,
          })
        }

        newPipes = newPipes.filter((pipe) => pipe.x > -PIPE_WIDTH)

        // Check for collisions
        const birdLeft = 50
        const birdRight = 50 + 32
        const birdTop = birdY
        const birdBottom = birdY + 32

        for (const pipe of newPipes) {
          if (
            birdRight > pipe.x &&
            birdLeft < pipe.x + PIPE_WIDTH &&
            (birdTop < pipe.topHeight || birdBottom > pipe.topHeight + PIPE_GAP)
          ) {
            setGameOver(true)
            return newPipes
          }
        }

        // Increase score when passing a pipe
        if (newPipes[0].x + PIPE_WIDTH < 50 && newPipes[0].x + PIPE_WIDTH > 50 - PIPE_SPEED) {
          setScore((s) => s + 1)
        }
        setTimer((t) => t + 1)

      })
    }, 1000 / 60) // 60 FPS

    return () => clearInterval(gameLoop)
  }, [birdY, birdVelocity, gameOver])

  return (
    <div
      className="relative bg-blue-300 overflow-hidden"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      onClick={jump}
    >
      <Bird y={birdY} />
      {pipes.map((pipe, index) => (
        <Pipe key={index} x={pipe.x} topHeight={pipe.topHeight} />
      ))}
      <div className="absolute top-4 left-4 text-2xl font-bold text-white">
        <div>Score: {score}</div>
        <div>T: {timer}</div>
      </div>
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-2xl font-bold text-center">
            <p>Game Over</p>
            <p>Score: {score}</p>
            <p className="text-sm mt-4">Click or press Space to restart</p>
          </div>
        </div>
      )}
    </div>
  )
}

