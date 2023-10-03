'use client'
import React, { useState } from "react";
import { randownValues } from '@/libPixiReact/actions/helpers.action';
import { SpriteSheetStatsProps, SpriteSheetProps, SummonSpriteSheets } from '../SummonEnemies';
import { AnimatedSprite, Sprite } from 'pixi.js';

interface EnemySummonSpriteSheets { numberOfSprites?: number;  defaultProps?: SpriteSheetProps }

export const Explosions = ({ numberOfSprites = 1, defaultProps = { jsonURL: 'https://pixijs.com/assets/spritesheet/mc.json' } }: EnemySummonSpriteSheets) => {
	const defaultPropsExplosions = ({ playerDataRef }: SpriteSheetStatsProps) => (
		{
			...defaultProps,
			update: (explosion: AnimatedSprite, delta: number, app: any) => {
				const player = playerDataRef?.current;
				if(player.hitted) {
					const collider = player?.collider;
					explosion.x = collider?.sprite?.x;
					explosion.y = collider?.sprite?.y;
					explosion.scale.set(0.2 + Math.random() * 0.5);
					//player.sprite.addChild(explosion)
					//explosion.gotoAndPlay(Math.random() * 26 | 0);
				}
				else {
					explosion.scale.set(0);
					explosion.x = player?.sprite?.x;
					explosion.y = player?.sprite?.y;
				}
			}
		}
	);

	const spriteSheetStats = (props: SpriteSheetStatsProps) => Array.from({ length: numberOfSprites }, () => randownValues({
			...props,
			defaultProps: defaultPropsExplosions(props)
		})
	);

	return (
		<SummonSpriteSheets spriteSheetStats={spriteSheetStats} />
	);
};
