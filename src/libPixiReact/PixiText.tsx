'use client'
import { Text, TextStyle } from "pixi.js";
import React, { useEffect, useState } from "react";
import { GameObject, ImagePixi, PixiApplicationContext } from "./PixiApplication";
import { setImageOptions } from "./actions/helpers.action";

export type IPixiText = {
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

const PixiText = React.forwardRef((props: IPixiText, ref) => {
    const [gameObject, setGameObject] = useState<GameObject | undefined>();
    const { text = '', destroySprite, update, onStart } = props;
    const { app, screenWidth, screenHeight, addGameObject, destroyGameObject } = React.useContext<PixiApplicationContext>(PixiApplicationContext);

    useEffect(() => {
        if(!gameObject) {
            const style = new TextStyle({
                fontFamily: 'Arial',
                fontSize: 40,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: ['#ffffff', '#0099ff'], // gradient
                stroke: '#4a1850',
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440,
                lineJoin: 'round',
            });

            const textPixi = new Text(text, style);
            setImageOptions(textPixi, { ...props, width: 40, height: 40, screenWidth, screenHeight });
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

PixiText.displayName = "PixiText";

export default PixiText;
