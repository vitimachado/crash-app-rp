'use client'
import React from "react";
import { SummonFactory } from "../Factories/SummonFactory";
import { Item } from "./Item";
import { PixiSpriteSheet } from "@/libPixiReact/PixiSpriteSheet";

export const Items = ({ numberOfSprites = 10, defaultProps }: { numberOfSprites: number, defaultProps?: PixiSpriteSheet }) => {
	return (
		<SummonFactory numberOfSprites={numberOfSprites} component={Item} defaultComponentProps={defaultProps} />
	);
};
