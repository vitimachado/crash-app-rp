'use client'
import { getRandomInt, randownValues, rectIntersection } from '@/libPixiReact/actions/helpers.action';
import { SpriteSheetStatsProps, SpriteSheetProps } from '../Factories/SummonEnemies';
import { SummonFactory } from '../Factories/SummonFactory';
import { AnimatedSprite, Application } from 'pixi.js';

interface EnemySummonSpriteSheets { numberOfSprites?: number;  defaultProps?: SpriteSheetProps }

export const Items = ({ numberOfSprites = 1, defaultProps = { jsonURL: '/imgs/sprites/sapphirespinning.json' } }: EnemySummonSpriteSheets) => {
	const getValues = ({ playerSprite, onColision, screenWidth, screenHeight, defaultProps }: SpriteSheetStatsProps): SpriteSheetProps => {
		return {
			x: getRandomInt(screenWidth),
			y: getRandomInt(screenHeight),
			width: 20,
			height: 20,
			animationSpeed: 0.6,
			stats: {
				speed: 5,
			},
			update: (sprite: AnimatedSprite, delta: number, app: Application) => {
				if(rectIntersection(playerSprite?.current, sprite)) {
					onColision(
						sprite,
						{
							score: 1,
							other: {
								sprite,
								stats: {
									speed: 5
								}
							}
						}
					);
					sprite.stop();
					//sprite.destroy();
					app.stage.removeChild(sprite);
				}
			},
			...defaultProps
		};
	  };
	return (
		<SummonFactory numberOfSprites={numberOfSprites} factoryValues={(values: any) => getValues({ ...values, defaultProps })} />
	);
};
