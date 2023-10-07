'use client'
import React from "react";
import { PlayerContext } from "../Player";
import { HorizontalBar } from "./HorizontalBar";
import { PixiApplicationContext } from "@/libPixiReact/PixiApplication";
import { TextField } from "./TextField";

export const MainUI = () => {
    const { screenWidth } = React.useContext<PixiApplicationContext>(PixiApplicationContext);
    const { playerDataRef } = React.useContext<any>(PlayerContext);
	const maxLife = playerDataRef?.current?.maxLife;
	const life = playerDataRef?.current?.life;
	const score = playerDataRef?.current?.score;
	const xScore = (screenWidth ?? 100)-50;

	return (
		<>
			<HorizontalBar maxValue={maxLife} value={life} />
			<TextField text={score < 10 ? ` ${score}` : score} x={xScore} y={50} />
		</>
	);
};
