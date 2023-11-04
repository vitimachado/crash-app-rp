'use client'
import React from "react";
import { SummonFactory } from "../Factories/SummonFactory";
import { Item } from "./Item";
import { IPixiSpriteSheet } from "@/libPixiReact/PixiSpriteSheet";

export const Items = ({ numberOfSprites, defaultProps }: { numberOfSprites?: number, defaultProps?: IPixiSpriteSheet }) => {
	return !!numberOfSprites ? (
		<SummonFactory numberOfSprites={numberOfSprites} component={Item} defaultComponentProps={defaultProps} />
	) : <></>;
};
