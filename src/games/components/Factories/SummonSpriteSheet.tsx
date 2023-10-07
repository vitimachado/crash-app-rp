'use client'
import { PixiApplicationContext } from "@/libPixiReact/PixiApplication";
import { PixiSpriteSheet } from "@/libPixiReact/PixiSpriteSheet";
import React, { useEffect, useState } from "react";
import { PlayerContext } from "../Player";
import { AnimatedSprite, Application, Sprite } from "pixi.js";

export type SpriteSheetStatsProps = {
    playerSprite: any;
    onColision: any;
    screenWidth: any;
    screenHeight: any;
    defaultProps?: PixiSpriteSheet;
    playerDataRef?: any;
}

export type ISummonSpriteSheet = {
    spriteSheetStats: ({ playerSprite, onColision, screenWidth, screenHeight, playerDataRef }: SpriteSheetStatsProps) => PixiSpriteSheet;
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