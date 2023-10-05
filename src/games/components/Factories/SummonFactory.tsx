'use client'
import { SpriteSheetStatsProps, SpriteSheetProps, SummonSpriteSheets } from './SummonEnemies';

interface SummonFactory { numberOfSprites?: number;  factoryValues?: any }

export const SummonFactory = ({ numberOfSprites = 1, factoryValues }: SummonFactory) => {

	const spriteSheetStats = ({ playerSprite, onColision, screenWidth, screenHeight }: SpriteSheetStatsProps) => Array.from(
		{ length: numberOfSprites }, () => factoryValues({ playerSprite, onColision, screenWidth, screenHeight })
	);

	return (
		<SummonSpriteSheets spriteSheetStats={spriteSheetStats} />
	);
};
