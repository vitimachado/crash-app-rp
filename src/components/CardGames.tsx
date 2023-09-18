'use client'
import PixiContainer from '@/libPixiReact/PixiContainer';
import { PixiTiling } from '@/libPixiReact/PixiTiling';
import Link from 'next/link';

type Props = { 
  item: {
    id: number;
    img: string;
    name: string;
    description: string;
  }
}

export const CardGames = ({ item }: Props) =>
{
  return (
    <div className="block rounded-t-lg shadow-inner shadow-[0_10px_30px_-5px_rgba(255,255,255,0.11)]">
      <div className="relative overflow-hidden bg-cover bg-no-repeat" data-te-ripple-init  data-te-ripple-color="light">
          <img className="rounded-t-lg" src={item.img} alt="" />
          <Link href={`/console/${item?.id}`} >
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </Link>
      </div>
      <div className="p-4 rounded-b-lg bg-[#121212]">
          <h6 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">{item?.name}</h6>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{item?.description}</p>
      </div>
  </div>
  );
};