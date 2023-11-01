'use client'
import React from "react";
import { SummonFactory } from "../Factories/SummonFactory";
import { Item } from "./Item";
import { IPixiSpriteSheet } from "@/libPixiReact/PixiSpriteSheet";

export const Items = ({ numberOfSprites = 10, defaultProps }: { numberOfSprites: number, defaultProps?: IPixiSpriteSheet }) => {
	return (
		<SummonFactory numberOfSprites={numberOfSprites} component={Item} defaultComponentProps={defaultProps} />
	);
};
