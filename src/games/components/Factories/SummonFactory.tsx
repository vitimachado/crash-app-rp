'use client'
import { PixiSpriteSheet } from '@/libPixiReact/PixiSpriteSheet';
import { ISummonSpriteSheet, SummonSpriteSheet } from './SummonSpriteSheet';

export interface SummonFactory {
	id?: string;
	numberOfSprites?: number;
	factoryValues?: ISummonSpriteSheet;
	component?: (defaultProps?: PixiSpriteSheet) => React.JSX.Element;
	defaultComponentProps?: PixiSpriteSheet;
}

export const SummonFactory = ({ id='', numberOfSprites = 1, factoryValues, component: Component, defaultComponentProps: defaultProps }: SummonFactory) => {

	const spriteSheetStatsArray = () => Array.from({ length: numberOfSprites }, () => factoryValues);

	return spriteSheetStatsArray().map((data, index) => !!Component ?
		<Component key={`summonEnemies-${id}-${index}`} {...defaultProps} /> :
		data ? <SummonSpriteSheet key={`summonEnemies-${id}-${index}`} {...data} /> :
		<></>
	);
};
