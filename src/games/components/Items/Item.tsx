'use client'
import React, { useState } from "react";
import { getRandomInt, rectIntersection } from '@/libPixiReact/actions/helpers.action';
import { SpriteSheetStatsProps, SummonSpriteSheet } from '../Factories/SummonSpriteSheet';
import { AnimatedSprite, Application } from 'pixi.js';
import { PixiSpriteSheet } from '@/libPixiReact/PixiSpriteSheet';
import { GlowFilter } from "pixi-filters";

export const Item = (defaultProps?: PixiSpriteSheet) => {
    const [destroySpriteSheet, setDestroySpriteSheet] = useState<boolean>(false);

	const getValues = ({ playerSprite, onColision, screenWidth, screenHeight }: SpriteSheetStatsProps): PixiSpriteSheet => {
		return {
            jsonURL: '/imgs/sprites/sapphirespinning.json' ,
			x: getRandomInt(screenWidth),
			y: getRandomInt(screenHeight),
			width: 20,
			height: 20,
			animationSpeed: 0.6,
			stats: {
				speed: 5,
			},
			onLoad: (anim: AnimatedSprite, app?: Application) => {
				if(anim?.destroyed) {
					return;
				}
				const glowFilter = new GlowFilter({ color: 255, alpha: 1, innerStrength: 1.42, outerStrength: 5 });
				anim?.filters?.push(glowFilter);
			},
			update: (anim: AnimatedSprite, delta: number, app: Application) => {
				if(anim?.destroyed || playerSprite?.current?.destroyed) {
					return;
				}
				if(rectIntersection(playerSprite?.current, anim)) {
					onColision(anim,
						{
							score: 1,
							other: {
								sprite: anim,
								stats: {
									speed: 5
								}
							}
						}
					);
					setDestroySpriteSheet(true)
				}
			},
			...(defaultProps ?? {})
		};
	  };
	return (
		<SummonSpriteSheet spriteSheetStats={getValues} destroySpriteSheet={destroySpriteSheet} />
	);
};
