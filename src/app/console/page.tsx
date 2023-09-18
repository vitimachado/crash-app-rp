'use client'
import getAllGames from '@/lib/getAllGames'
import { Metadata } from 'next'
import Link from 'next/link';
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
        <div className='p-8'>
            <h1 className='pb-5 text-xl'>Console</h1>
            <div className=''>
                <ListView list={games} />
            </div>
        </div>

    )
}

const ListView = ({ list }: { list: any }) => {
    return (
        <div className="flex flex-col container max-w-md mt-10 mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
            <ul className="flex flex-col divide-y w-full h-[100%] bg-black items-center">
                {
                    list.map((item: any) => (
                        <li className="flex flex-row w-[60%]" key={item?.id}>
                            <div className="block rounded-t-lg">
                                <div className="relative overflow-hidden bg-cover bg-no-repeat" data-te-ripple-init  data-te-ripple-color="light">
                                    <img className="rounded-t-lg" src="/imgs/bg/sky01.png" alt="" />
                                    <Link href={`/console/${item?.id}`} >
                                        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                    </Link>
                                </div>
                                <div className="p-4 rounded-b-lg bg-[#121212]">
                                    <h6 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">{item?.name}</h6>
                                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{item?.description}</p>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};