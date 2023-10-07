'use client'
import React, { useRef } from "react";
import { randownValues } from '@/libPixiReact/actions/helpers.action';
import { PixiGraphic } from '@/libPixiReact/PixiGraphic';
import { Graphics } from 'pixi.js';

interface HorizontalBar { 
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    borderRadius?: number;
    borderColor?: number;
    fillColor?: number;
    maxValue: number;
    value?: any;
 }

export const HorizontalBar = ({ x = 20, y = 20, width = 400, height = 30, borderRadius = 8, borderColor = 0xFFDDDD, fillColor = 0xFF0000, maxValue = 0.0001, value }: HorizontalBar) => {
    const currentValue = useRef(maxValue);
    currentValue.current = value;

    const calcValue = (curr: number) => {
        return width * curr / maxValue;
    };

    const changeInternalGraphic = (graphics: any, w?: number) => {
        // Rectangle
        graphics.beginFill(fillColor);
        graphics.drawRoundedRect(x, y, w ?? width, height, borderRadius);
        graphics.endFill();
    }

	const handleOnStartBackground = (graphics: any, app: any) => {
        // draw a rounded rectangle
        graphics.lineStyle(2, borderColor, 1);
        graphics.beginFill(0x353535, 0.25);
        graphics.drawRoundedRect(x, y, width, height, borderRadius);
        graphics.endFill();
    };

	const handleOnStart = (graphics: any) => {
        changeInternalGraphic(graphics);
    };

	const handleUpdate = (graphics: Graphics) => {
        if(!!currentValue?.current) {
            const width = calcValue(currentValue.current);
            graphics.clear();
            changeInternalGraphic(graphics, width);
        }
    };

	return (
        <>
            <PixiGraphic onStart={handleOnStartBackground} />
            <PixiGraphic onStart={handleOnStart} update={handleUpdate} />
        </>
	);
};
