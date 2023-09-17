import ReturnGame from '@/games'
import { RocketMan } from '@/games/RocketMan/RocketMan'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Game',
  description: 'Game page description',
}

type Params = {
    params: {
        gameId: string
    }
}
 
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const id = params.gameId;

  return {
    title: `Game ${id}`,
    description: 'Game page description',
  }
}

export default function Game({ params: { gameId } }: Params) {
  return (
    <>
      <div>Game {gameId}</div>
      {/* <ReturnGame gameId={gameId} /> */}
      <RocketMan />
    </>
  )
}