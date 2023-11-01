'use client'
import { PixiApplicationContext } from "@/libPixiReact/PixiApplication";
import PixiSpriteSheet, { IPixiSpriteSheet } from "@/libPixiReact/PixiSpriteSheet";
import { Application, Sprite } from "pixi.js";
import React from "react";
import { PlayerContext } from "../Player";

export type SpriteSheetStatsProps = {
    playerSprite: any;
    onColision: any;
    screenWidth: any;
    screenHeight: any;
    defaultProps?: IPixiSpriteSheet;
    playerDataRef?: any;
}

export type ISummonSpriteSheet = {
    spriteSheetStats: ({ playerSprite, onColision, screenWidth, screenHeight, playerDataRef }: SpriteSheetStatsProps) => IPixiSpriteSheet;
    destroySpriteSheet?: boolean;
    onLoadSummonSpriteSheets ?: (sprite: Sprite, app: Application) => void;
};

export const SummonSpriteSheet = (props: ISummonSpriteSheet) => {
    const { playerSprite, onColision, playerDataRef } = React.useContext<any>(PlayerContext);

    const { screenWidth, screenHeight, app } = React.useContext<any>(PixiApplicationContext);
    const { spriteSheetStats, destroySpriteSheet } = props;
    if(!screenWidth) {
        return <></>;
    }

    return <>
        {
            <PixiSpriteSheet {...{ ...spriteSheetStats({ playerSprite, onColision, screenWidth, screenHeight, playerDataRef }),  destroySpriteSheet } } />
        }
    </>;
};