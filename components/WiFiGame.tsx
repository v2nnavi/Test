import React, { useState, useEffect, useCallback } from 'react'

const GAME_HEIGHT = 400
const GAME_WIDTH = 300
const PLAYER_SIZE = 20
const OBSTACLE_WIDTH = 10
const OBSTACLE_GAP = 100

interface Obstacle {
  x: number
  topHeight: number
  bottomHeight: number
}

export default function WiFiGame() {
  const [playerY, setPlayerY] = useState(GAME_HEIGHT / 2)
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const createObstacle = useCallback(() => {
    const topHeight = Math.random() * (GAME_HEIGHT - OBSTACLE_GAP)
    const bottomHeight = GAME_HEIGHT - topHeight - OBSTACLE_GAP
    return {
      x: GAME_WIDTH,
      topHeight,
      bottomHeight,
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!gameOver) {
        setObstacles((prevObstacles) => {
          const newObstacles = prevObstacles
            .map((obstacle) => ({ ...obstacle, x: obstacle.x - 2 }))
            .filter((obstacle) => obstacle.x > -OBSTACLE_WIDTH)

          if (newObstacles.length < 3) {
            newObstacles.push(createObstacle())
          }

          return newObstacles
        })

        setScore((prevScore) => prevScore + 1)
      }
    }, 50)

    return () => clearInterval(intervalId)
  }, [gameOver, createObstacle])

  useEffect(() => {
    const checkCollision = () => {
      const playerTop = playerY
      const playerBottom = playerY + PLAYER_SIZE

      for (const obstacle of obstacles) {
        if (
          obstacle.x < PLAYER_SIZE &&
          obstacle.x + OBSTACLE_WIDTH > 0 &&
          (playerTop < obstacle.topHeight || playerBottom > GAME_HEIGHT - obstacle.bottomHeight)
        ) {
          setGameOver(true)
          break
        }
      }
    }

    checkCollision()
  }, [playerY, obstacles])

  const handleClick = () => {
    if (gameOver) {
      setGameOver(false)
      setScore(0)
      setPlayerY(GAME_HEIGHT / 2)
      setObstacles([])
    } else {
      setPlayerY((prevY) => Math.max(0, prevY - 50))
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-blue-100 p-4">
      <div className="mb-4 text-xl font-bold">WiFi Signal Strength: {score}</div>
      <div
        className="relative bg-blue-300 border-2 border-blue-500"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        onClick={handleClick}
      >
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold">
            Game Over
          </div>
        )}
        <div
          className="absolute bg-yellow-400 rounded-full"
          style={{
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            left: 10,
            top: playerY,
          }}
        />
        {obstacles.map((obstacle, index) => (
          <React.Fragment key={index}>
            <div
              className="absolute bg-red-500"
              style={{
                width: OBSTACLE_WIDTH,
                height: obstacle.topHeight,
                left: obstacle.x,
                top: 0,
              }}
            />
            <div
              className="absolute bg-red-500"
              style={{
                width: OBSTACLE_WIDTH,
                height: obstacle.bottomHeight,
                left: obstacle.x,
                bottom: 0,
              }}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 text-sm">Click to jump and avoid obstacles!</div>
    </div>
  )
}

