'use client'
import React, { useState } from "react";
import { getRandomInt, rectIntersection } from '@/libPixiReact/actions/helpers.action';
import { SpriteSheetStatsProps, SummonSpriteSheet } from '../Factories/SummonSpriteSheet';
import { AnimatedSprite, Application } from 'pixi.js';
import { PixiSpriteSheet } from '@/libPixiReact/PixiSpriteSheet';
import { GlowFilter } from "pixi-filters";
import * as PIXI from 'pixi.js';

export const Item = (defaultProps?: PixiSpriteSheet) => {
    const [destroySpriteSheet, setDestroySpriteSheet] = useState<boolean>(false);

	const getValues = ({ playerSprite, onColision, screenWidth, screenHeight }: SpriteSheetStatsProps): PixiSpriteSheet => {
        let count = 0;
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
				const glowFilter = new GlowFilter({ distance: 1, innerStrength: 1.42, outerStrength: 5 });
                anim.filters = [ ...(anim?.filters ?? []), glowFilter ];
			},
			update: (anim: AnimatedSprite, delta: number, app: Application) => {
				if(anim?.destroyed || playerSprite?.current?.destroyed) {
					return;
				}
                anim?.filters?.forEach((o: any) => {
                    if(o?.outerStrength) {
                        count += 0.001;
                        if(count === 1) {
                            count = 0;
                        }
                        o.outerStrength = Math.cos(count * 50) * 5
                    }
                });
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
