'use client'
import { randownValues } from '@/libPixiReact/actions/helpers.action';
import { SpriteSheetStatsProps, SpriteSheetProps } from '../Factories/SummonEnemies';
import { SummonFactory } from '../Factories/SummonFactory';

interface EnemySummonSpriteSheets { numberOfSprites?: number;  defaultProps?: SpriteSheetProps }

export const Meteorites = ({ numberOfSprites = 1, defaultProps = { jsonURL: '/imgs/sprites/meteorite_sprite.json' } }: EnemySummonSpriteSheets) => {
	return (
		<SummonFactory numberOfSprites={numberOfSprites} factoryValues={(values: any) => randownValues({ ...values, defaultProps })} />
	);
};
