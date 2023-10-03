'use client'
import { randownValues } from '@/libPixiReact/actions/helpers.action';
import { SpriteSheetStatsProps, SpriteSheetProps, SummonSpriteSheets } from '../SummonEnemies';

interface EnemySummonSpriteSheets { numberOfSprites?: number;  defaultProps?: SpriteSheetProps }

export const Meteorites = ({ numberOfSprites = 1, defaultProps = { jsonURL: '/imgs/sprites/meteorite_sprite.json' } }: EnemySummonSpriteSheets) => {

	const spriteSheetStats = ({ playerSprite, onColision, screenWidth, screenHeight }: SpriteSheetStatsProps) => Array.from(
		{ length: numberOfSprites }, () => randownValues({ playerSprite, onColision, screenWidth, screenHeight, defaultProps })
	);

	return (
		<SummonSpriteSheets spriteSheetStats={spriteSheetStats} />
	);
};
