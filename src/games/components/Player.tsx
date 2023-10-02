'use client'
import React, { useEffect, useState, useCallback, useRef } from "react";
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
    const { inputsKeyboard } = React.useContext<any>(InputKeyboardContext);
    const inputsKeyboardRef = useRef();
    inputsKeyboardRef.current = inputsKeyboard;
    const playerdRef = useRef();
    playerdRef.current = sprite;
    const { imageURL = '/imgs/ufo1.png', width = 100, height = 100, stats, children } = props;

    const update = (sprite: any, delta: number, app: any) => {
        sprite.rotation += 0.05 * delta;
        handleInput(sprite, app, inputsKeyboardRef.current, stats)
    }

    const handleOnStart = (sprite: any, app: any) => {
        setSprite(sprite);
    }

    const onColision = (sprite: any, stats: any) => {
        console.log("🚀 ~ file: Player.tsx:44 ~ onColision ~ stats:", stats)
    }

    return (
        <PixiStage>
            <PlayerContext.Provider value={{ playerSprite: playerdRef, onColision }}>
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