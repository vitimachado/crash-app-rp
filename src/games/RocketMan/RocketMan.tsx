'use client'
import PixiApplication from '@/libPixiReact/PixiApplication';
import { Background } from '@/components/Background';
import { Player } from '@/games/components/Player';
import { InputKeyboard } from '@/components/InputKeyboard';
import { Meteorites } from '../components/Enemies/Meteorites';

export const RocketMan = () => {

	return (
		<PixiApplication>
		<InputKeyboard>
			<Background backgroundURL='/imgs/bg/sky01.png'>
			<Player imageURL='/imgs/ufo1.png' stats={{ maxLife: 10000 }}>
				<Meteorites />
			</Player>
			</Background>
		</InputKeyboard>
		</PixiApplication>
	);
};