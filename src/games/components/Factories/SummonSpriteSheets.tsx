'use client'
import { PixiApplicationContext } from "@/libPixiReact/PixiApplication";
import PixiSpriteSheet, { IPixiSpriteSheet } from "@/libPixiReact/PixiSpriteSheet";
import React, { useEffect, useState } from "react";
import { PlayerContext } from "../Player";
import { AnimatedSprite, Application, Sprite } from "pixi.js";

export type SpriteSheetStatsProps = {
    playerSprite: any;
    onColision: any;
    screenWidth: any;
    screenHeight: any;
    defaultProps?: IPixiSpriteSheet;
    playerDataRef?: any;
}

type Props = {
    spriteSheetStats: ({ playerSprite, onColision, screenWidth, screenHeight, playerDataRef }: SpriteSheetStatsProps) => IPixiSpriteSheet[];
    onLoadSummonSpriteSheets ?: (sprite: Sprite, app: Application) => void;
};

export const SummonSpriteSheets = (props: Props) => {
    const [init, setInit] = useState(false);
    const [destroyArray, setDestroyArray] = useState<number[]>([]);
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

    const handleDestroyObject = (index: number) => {
        setDestroyArray(prev => [ ...prev, index ]);
    };

    const handleRebirthObject = (index: number) => {
        setDestroyArray(destroyArray.splice(index, 1));
    };

    return <>
        {
            spriteSheetStats({ playerSprite, onColision, screenWidth, screenHeight, playerDataRef })
                .map((spriteSheet: any, index) => spriteSheet?.jsonURL && !destroyArray.includes(index) ? (
                        <PixiSpriteSheet
                            key={`summonEnemies-${spriteSheet.jsonURL}-${index}`}
                            {...props}
                            { ...spriteSheet }
                            destroyObject={() => handleDestroyObject(index)}
                            rebirthObject={(value: number) => handleRebirthObject(value)}
                            resetObjects={() => setDestroyArray([])}
                        />
                    ) : null
                )
        }
    </>;
};