'use client'
import React from "react";
import { AnimatedSprite, Application } from 'pixi.js';
import { PixiSpriteSheet } from "@/libPixiReact/PixiSpriteSheet";
import { PlayerContext } from "../Player";

interface EnemySummonSpriteSheets { numberOfSprites?: number;  defaultProps?: PixiSpriteSheet }

export const Explosions = () => {
    const { playerDataRef } = React.useContext<any>(PlayerContext);

	const spriteSheet = {
		jsonURL: 'https://pixijs.com/assets/spritesheet/mc.json',
		onLoad: (explosion: AnimatedSprite, app?: Application) => {
			explosion.onComplete = () => {
				explosion.gotoAndStop(0);
				app && app.stage.removeChild(explosion);
			};
		},
		update: (explosion: AnimatedSprite, delta: number, app?: Application) => {
			if(explosion?.destroyed) {
				return;
			}
			const player = playerDataRef?.current;
			if(player.hitted) {
				const collider = player?.collider;
				explosion.x = collider?.sprite?.x;
				explosion.y = collider?.sprite?.y;
				explosion.scale.set(0.2 + Math.random() * 0.5);
				
				explosion.loop = false;
				explosion.animationSpeed = 5;
				explosion.play();
				app && app.stage.addChild(explosion);
			}
		}
	};

	return (
		<PixiSpriteSheet {...spriteSheet} />
	);
};
