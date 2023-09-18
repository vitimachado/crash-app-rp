'use client'
import { CardGames } from './CardGames';

type Props = { children: any, update?: any, backgroundURL?: string }

export const ListView = ({ list }: { list: any }) => {
    return (
        <div className="flex flex-col container max-w-md mt-10 mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
            <ul className="flex flex-col divide-y w-full h-[100%] bg-black items-center">
                {
                    list.map((item: any) => (
                        <li className="flex flex-row w-[60%]" key={item?.id}>
                          <CardGames item={item} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};