'use client'
import { randownValues } from '@/libPixiReact/actions/helpers.action';
import { SummonFactory } from '../Factories/SummonFactory';
import { SpriteSheetStatsProps } from '../Factories/SummonSpriteSheet';

interface EnemySummonSpriteSheets { numberOfSprites?: number;  defaultProps?: any }

export const Meteorites = ({ numberOfSprites = 1, defaultProps = { jsonURL: '/imgs/sprites/meteorite_sprite.json' } }: EnemySummonSpriteSheets) => {
	return (
		<SummonFactory
			numberOfSprites={numberOfSprites}
			factoryValues={{ spriteSheetStats: (values: SpriteSheetStatsProps) => randownValues({ ...values, defaultProps }) }} />
	);
};
