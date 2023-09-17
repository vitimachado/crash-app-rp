'use client'
import React, { useEffect, useState, useCallback } from "react";
import { PixiSprite } from '@/libPixiReact/PixiSprite';
import PixiStage from '@/libPixiReact/PixiStage';
import { InputKeyboardContext } from "@/components/InputKeyboard";
import { handleInput } from "../actions/inputs";
import { PixiApplicationContext } from "@/libPixiReact/PixiApplication";

type Props = {
    children: any;
    imageURL: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    wrap?: any;
    update?: (sprite:any, delta: number, app?: any) => void;
    stats?: {
        speed: number;
    }
};

export const PlayerContext = React.createContext({});

export const Player = (props: Props) => {
    const [sprite, setSprite] = useState<any>();
    const { app } = React.useContext<any>(PixiApplicationContext);
    const { inputsKeyboard } = React.useContext<any>(InputKeyboardContext);
    const { imageURL = '/imgs/ufo1.png', width = 100, height = 100, stats, children } = props;
    
    useEffect(() => {
        if(!!sprite) {
            handleInput(sprite, app, inputsKeyboard, stats);
        }
        return () => {
        };
    }, [inputsKeyboard]);

    const update = (sprite: any, delta: number, app: any) => {
        sprite.rotation += 0.05 * delta;
    }

    const handleOnStart = (sprite: any, app: any) => {
        setSprite(sprite);
        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;
        app.stage.on('mousemove', (event: any) => {
            sprite.x = event.global.x;
            sprite.y = event.global.y;
        });
    }

    return (
        <PixiStage>
            <PlayerContext.Provider value={{ playerSprite: sprite }}>
                <PixiSprite
                    imageURL={imageURL}
                    width={width}
                    height={height}
                    update={update}
                    onStart={handleOnStart} />
                {children}
            </PlayerContext.Provider>
        </PixiStage>
    );
};