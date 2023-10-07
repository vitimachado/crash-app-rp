'use client'
import { Text } from "pixi.js";
import React, { useEffect, useState } from "react";
import { GameObject, ImagePixi, PixiApplicationContext } from "./PixiApplication";
import { setImageOptions } from "./actions/helpers.action";

export type PixiText = {
    text?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    wrap?: any;
    auxData?: any;
    destroySprite?: boolean;
    update?: (sprite: Text, delta: number) => void;
    onStart?: (sprite: Text, app: any) => void;
};

export const PixiText = React.forwardRef((props: PixiText, ref) => {
    const [gameObject, setGameObject] = useState<GameObject | undefined>();
    const { text = '', destroySprite, update, onStart } = props;
    const { app, screenWidth, screenHeight, addGameObject, destroyGameObject } = React.useContext<PixiApplicationContext>(PixiApplicationContext);

    useEffect(() => {
        if(!gameObject) {
            const textPixi = new Text(text, {
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 0xffff50,
                align: 'center',
            });
            setImageOptions(textPixi, { ...props, screenWidth, screenHeight });
            const gameObject = {
                img: textPixi,
                update: (delta: number) => {
                    !!update && !textPixi.destroyed && update(textPixi, delta);
                },
                refComponent: ref
            };
            setGameObject(gameObject);
            addGameObject && addGameObject(gameObject);
            onStart && onStart(textPixi, app);
        }

        return () => {
            destroyGameObject && gameObject && destroyGameObject(gameObject);
            setGameObject(undefined);
        };
    }, []);

    useEffect(() => {
        if(!!destroySprite && !!gameObject) {
            destroyGameObject && destroyGameObject(gameObject);
            setGameObject(undefined);
        }
    }, [destroySprite]);

    return <></>
});
