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
            <ul className="flex flex-col divide-y w-full">
                {
                    list.map((item: any) => (
                        <li className="flex flex-row" key={item?.id}>
                            <Link href={`/console/${item?.id}`} className="w-[110%]">
                                <div className="select-none cursor-pointer hover:bg-gray-100 flex flex-1 items-center p-4 w">
                                    <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                                    <div className="block relative">
                                        <img alt="profil" src="/imgs/bg/sky01.png" className="mx-auto object-cover rounded-full h-10 w-10" />
                                    </div>
                                    </div>
                                    <div className="flex-1 pl-1">
                                    <div className="font-medium dark:text-white">{item?.name}</div>
                                    <div className="text-gray-600 dark:text-gray-200 text-sm"></div>
                                    </div>
                                    <div className="flex flex-row justify-center">
                                        <button className="w-10 text-right flex justify-end">
                                            <svg width="20" fill="currentColor" height="20" className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}