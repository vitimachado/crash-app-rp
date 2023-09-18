import ReturnGame from '@/games'
import { Metadata } from 'next'
import React from 'react'
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
      <h2 className='px-8 text-xl'>Game {gameId}</h2>
      <ReturnGame gameId={gameId} />
    </>
  )
}