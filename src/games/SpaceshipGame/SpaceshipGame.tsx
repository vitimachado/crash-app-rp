'use client'
import PixiApplication from '@/libPixiReact/PixiApplication';
import { Background } from '@/components/Background';
import { Player } from '@/games/components/Player';
import { InputKeyboard } from '@/components/InputKeyboard';
import { Meteorites } from '../components/Enemies/Meteorites';
import { Items } from '../components/Items/Items';

export const SpaceshipGame = () => {

	return (
		<PixiApplication>
			<InputKeyboard>
				<Background backgroundURL='/imgs/bg/sky01.png'>
					<Player imageURL='/imgs/ufo1.png' stats={{ maxLife: 10000 }}>
						<Meteorites numberOfSprites={30} />
						<Items numberOfSprites={30} />
					</Player>
				</Background>
			</InputKeyboard>
		</PixiApplication>
	);
};