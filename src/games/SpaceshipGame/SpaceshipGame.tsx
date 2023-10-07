'use client'
import { useEffect, useState } from 'react';
import PixiApplication from '@/libPixiReact/PixiApplication';
import { Background } from '@/components/Background';
import { Player } from '@/games/components/Player';
import { InputKeyboard } from '@/components/InputKeyboard';
import { Meteorites } from '../components/Enemies/Meteorites';
import { Items } from '../components/Items/Items';
import { HorizontalBar } from '../components/UI/HorizontalBar';
import { MainUI } from '../components/UI/MainUI';

export const SpaceshipGame = () => {
	const [first, setfirst] = useState(true);

	return first ? (
		<PixiApplication>
			<InputKeyboard>
				<Background backgroundURL='/imgs/bg/sky01.png'>
					<Player imageURL='/imgs/ufo1.png' stats={{ maxLife: 10000 }}>
						<Meteorites numberOfSprites={30} />
						<Items numberOfSprites={30} />
						<MainUI />
					</Player>
				</Background>
			</InputKeyboard>
		</PixiApplication>
	) : <>Paused</>;
};