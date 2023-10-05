'use client'
import { PixiApplicationContext } from "@/libPixiReact/PixiApplication";
import { PixiSpriteSheet } from "@/libPixiReact/PixiSpriteSheet";
import React, { useEffect, useState } from "react";
import { PlayerContext } from "../Player";
import { Application, Sprite } from "pixi.js";

export interface SpriteSheetProps {
    jsonURL?: string | string[];
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    animationSpeed?: number;
    stats?: {
        speed: number;
    };
    wrap?: any;
    update?: (sprite:any, delta: number, app?: any) => void;
    onStart?: (sprite: Sprite, app: any) => void;
};

export type SpriteSheetStatsProps = {
    playerSprite: any;
    onColision: any;
    screenWidth: any;
    screenHeight: any;
    defaultProps?: SpriteSheetProps;
    playerDataRef?: any;
}

type Props = {
    spriteSheetStats: ({ playerSprite, onColision, screenWidth, screenHeight, playerDataRef }: SpriteSheetStatsProps) => SpriteSheetProps[];
    onLoadSummonSpriteSheets ?: (sprite: Sprite, app: Application) => void;
};

export const SummonSpriteSheets = (props: Props) => {
    const [init, setInit] = useState(false)
    const { playerSprite, onColision, playerDataRef } = React.useContext<any>(PlayerContext);

    const { screenWidth, screenHeight, app } = React.useContext<any>(PixiApplicationContext);
    const { spriteSheetStats, onLoadSummonSpriteSheets } = props;

    useEffect(() => {
        // create a new Sprite from an image path
        if(!!playerSprite && !!app && !init) {
            onLoadSummonSpriteSheets && onLoadSummonSpriteSheets(playerSprite, app)
            setInit(true);
        }
    }, [app]);
    

    if(!screenWidth) {
        return <></>;
    }

    return <>
        {
            spriteSheetStats({ playerSprite, onColision, screenWidth, screenHeight, playerDataRef })
                .map((spriteSheet: any, i) => spriteSheet?.jsonURL ? (
                        <PixiSpriteSheet key={`summonEnemies-${spriteSheet.jsonURL}-${i}`} {...props} {...spriteSheet} />
                    ) : <></>
                )
        }
    </>;
};