'use client'
import React, { useEffect, useState, useCallback } from "react";
import { PixiSprite } from '@/libPixiReact/PixiSprite';
import PixiStage from '@/libPixiReact/PixiStage';
import { InputKeyboardContext } from "@/components/InputKeyboard";
import { PixiApplicationContext } from "@/libPixiReact/PixiApplication";
import { PixiSpriteSheet } from "@/libPixiReact/PixiSpriteSheet";
import { getRandomInt, updateMovementX, updateRandow } from "@/libPixiReact/actions/helpers.action";

type Props = {
    jsonURL: string | string[];
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    wrap?: any;
    update?: (sprite:any, delta: number, app?: any) => void;
    stats?: {
        speed: number;
    },
    randomNumber?: number;
};

export const SummonEnemies = (props: Props) => {
    const [sprite, setSprite] = useState<any>();
    const { screenWidth, screenHeight } = React.useContext<any>(PixiApplicationContext);
    const { inputsKeyboard } = React.useContext<any>(InputKeyboardContext);
    const { jsonURL = '/imgs/sprites/meteorite_sprite.json', randomNumber } = props;

    const jsonURLs = !!jsonURL ? Array.isArray(jsonURL) ? jsonURL : Array.from({length: randomNumber || 0}, () => jsonURL) : [];

    const randownValues = () => {
        const widthHeight = getRandomInt(100);
        return {
            animationSpeed: getRandomInt(100)/100,
            update: updateRandow(),
            x: getRandomInt(screenWidth),
            y: getRandomInt(screenHeight),
            width: getRandomInt(widthHeight),
            height: getRandomInt(widthHeight)
        };
    }

    if(!screenWidth) {
        return <></>;
    }
    console.log("🚀 ~ file: SummonEnemies.tsx:27 ~ SummonEnemies ~ screenWidth:", screenWidth)

    return <>
        {
            jsonURLs.map((json: any, i) => (
                <PixiSpriteSheet key={`summonEnemies-${jsonURL}-${i}`} jsonURL={json} {...randownValues()} />
            ))
        }
    </>;
};