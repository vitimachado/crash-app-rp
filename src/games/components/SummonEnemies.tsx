'use client'
import { PixiApplicationContext } from "@/libPixiReact/PixiApplication";
import { PixiSpriteSheet } from "@/libPixiReact/PixiSpriteSheet";
import { getRandomInt, updateRandow } from "@/libPixiReact/actions/helpers.action";
import React from "react";

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
    const { screenWidth, screenHeight } = React.useContext<any>(PixiApplicationContext);
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

    return <>
        {
            jsonURLs.map((json: any, i) => (
                <PixiSpriteSheet key={`summonEnemies-${jsonURL}-${i}`} jsonURL={json} {...randownValues()} />
            ))
        }
    </>;
};