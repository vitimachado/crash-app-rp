import getAllGames from '@/lib/getAllGames'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

type Props = {}

export const metadata: Metadata = {
    title: 'Console',
    description: 'Console page description',
}
  
export default async function Console(props: Props) {
    const gamesData = getAllGames();
    const games = await gamesData;
    return (
        <>
        <h2>Console</h2>
        {
            games.map((game: any) => <p key={game?.id}><Link href={`/console/${game?.id}`}>{game?.name}</Link></p>)
        }
        </>

    )
}