'use client'
import { useEffect, useState } from 'react';
import PixiApplication from '@/libPixiReact/PixiApplication';
import { Background } from '@/components/Background';
import { Player } from '@/games/components/Player';
import { InputKeyboard } from '@/components/InputKeyboard';
import { Meteorites } from '../components/Enemies/Meteorites';
import { Items } from '../components/Items/Items';
import { MainUI } from '../components/UI/MainUI';
import { IGameStats } from '@/shared/models/interfaces.model';

const initGameStats = {
	maxLife: 10000,
	level: 1,
	over: false,
	score: 0,
	enemiesNumber: 10,
	maxScore: 30
} as IGameStats;

const NextStepScreen = ({ gameStats, setGameStats }: {
	gameStats: IGameStats;
	setGameStats: (o: IGameStats) => void
}) => {
	const getGameStats = () => {
		const calcStat = (stat = 1, level: number) => {
			return stat + Math.ceil(((stat/50) * (level)) + level)
		}
		const newLevel = (gameStats?.level ?? 0) + 1;
		const gameStatsNextLevel = {
			...initGameStats,
			level: newLevel,
			enemiesNumber: calcStat(gameStats?.enemiesNumber, newLevel),
			maxScore: calcStat(gameStats?.maxScore, newLevel),
		} ;
		return gameStats?.nextLevel ? gameStatsNextLevel : initGameStats
	}

	return (
		<div className='flex flex-col items-center'>
			<h2>{ gameStats?.nextLevel ? 'Well Done!' : 'Game Over' }</h2>
			{ gameStats?.nextLevel ? <></> : <h4>Score: {gameStats?.score}</h4> }
			<button
				className="bg-sky-500/100 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
				onClick={() => setGameStats?.(getGameStats())}>
				{ gameStats?.nextLevel ? 'Go to Next Level' : 'Restart' }
			</button>
		</div>
	);
};

export const SpaceshipGame = () => {
	const [pause, setPaused] = useState(false);
	const [gameStats, setGameStats] = useState<IGameStats>(initGameStats);

	const handleOnSetStats = (gameStats: IGameStats) => {
		setGameStats(o => ({ ...o, ...gameStats }))
	};

	return !!gameStats?.over || !!gameStats?.nextLevel ? <NextStepScreen {...{ gameStats, setGameStats }} /> :
	(
		<PixiApplication>
			<InputKeyboard>
				<Background backgroundURL='/imgs/bg/sky01.png'>
					<Player imageURL='/imgs/ufo1.png' stats={gameStats} setGameStats={handleOnSetStats}>
						<Meteorites numberOfSprites={gameStats?.enemiesNumber} />
						<Items numberOfSprites={gameStats?.maxScore} />
						<MainUI gameStats={gameStats} />
					</Player>
				</Background>
			</InputKeyboard>
		</PixiApplication>
	);
};