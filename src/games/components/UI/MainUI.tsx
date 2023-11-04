'use client'
import React from "react";
import { PlayerContext } from "../Player";
import { HorizontalBar } from "./HorizontalBar";
import { PixiApplicationContext } from "@/libPixiReact/PixiApplication";
import { TextField } from "./TextField";
import { IGameStats } from "@/shared/models/interfaces.model";

export const MainUI = ({ gameStats }: { gameStats?: IGameStats; }) => {
    const { screenWidth } = React.useContext<PixiApplicationContext>(PixiApplicationContext);
    const { playerDataRef } = React.useContext<any>(PlayerContext);
	const maxLife = playerDataRef?.current?.maxLife;
	const life = playerDataRef?.current?.life;
	const score = playerDataRef?.current?.score;
	const xScore = (screenWidth ?? 100)-100;

	return (
		<>
			<HorizontalBar maxValue={maxLife} value={life} />
			<TextField text={`Level: ${gameStats?.level}`} x={xScore-100} y={40} width={80} />
			<TextField text={score < 10 ? ` ${score}` : score} x={xScore} y={40} />
			{
				!!gameStats?.maxScore ? (
					<>
						<TextField text={'/'} x={xScore+35} y={40} width={20} />
						<TextField text={gameStats?.maxScore < 10 ? ` ${gameStats?.maxScore}` : `${gameStats?.maxScore}`} x={xScore+50} y={40} />
					</>
				) : <></>
			}
		</>
	);
};
