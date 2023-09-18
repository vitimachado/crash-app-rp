'use client'
import { ListView } from '@/components/List';
import getAllGames from '@/lib/getAllGames';
import { Metadata } from 'next';

type Props = {}

export const metadata: Metadata = {
    title: 'Console',
    description: 'Console page description',
}
  
export default async function Console(props: Props) {
    const gamesData = getAllGames();
    const games = await gamesData;
    return (
        <div className='p-8'>
            <h1 className='pb-5 text-xl'>Games</h1>
            <div className=''>
                <ListView list={games} />
            </div>
        </div>

    )
}
