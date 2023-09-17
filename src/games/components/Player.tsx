'use client'
import React, { useEffect } from "react";
import { PixiSprite } from '@/libPixiReact/PixiSprite';
import PixiStage from '@/libPixiReact/PixiStage';
import { InputKeyboardContext } from "@/components/InputKeyboard";

type Props = { imageURL: string; x?: number; y?: number; width?: number; height?: number; update?: (sprite:any, delta: number, app?: any) => void; wrap?: any; };

export const Player = (props: Props) =>
{
    const { inputsKeyboard } = React.useContext<any>(InputKeyboardContext);
    const { imageURL = '/imgs/ufo1.png', width = 100, height = 100 } = props;
    
    useEffect(() => {
        console.log("🚀 ~ file: Player.tsx:12 ~ inputsKeyboard:", inputsKeyboard);

        return () => {
        };
    }, [inputsKeyboard]);

    const updateRotation = (sprite: any, delta: number) => {
        sprite.rotation += 0.05 * delta;
    }

    return (
        <PixiStage>
            <PixiSprite imageURL={imageURL} width={width} height={height} update={updateRotation} />
        </PixiStage>
    );
};