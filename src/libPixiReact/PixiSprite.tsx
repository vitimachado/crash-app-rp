'use client'
import { Sprite } from "pixi.js";
import React, { useEffect, useState } from "react";
import { GameObject, ImagePixi, PixiApplicationContext } from "./PixiApplication";
import { setImageOptions } from "./actions/helpers.action";

export type PixiSprite = {
    imageURL: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    wrap?: any;
    auxData?: any;
    destroySprite?: boolean;
    update?: (sprite: ImagePixi, delta: number) => void;
    onStart?: (sprite: ImagePixi, app: any) => void;
};

export const PixiSprite = React.forwardRef((props: PixiSprite, ref) => {
    const [gameObject, setGameObject] = useState<GameObject | undefined>();
    const { imageURL, destroySprite, update, onStart } = props;
    const { app, screenWidth, screenHeight, addGameObject, destroyGameObject } = React.useContext<PixiApplicationContext>(PixiApplicationContext);

    useEffect(() => {
        if(!gameObject) {
            const sprite = Sprite.from(imageURL);
            setImageOptions(sprite, { ...props, screenWidth, screenHeight });
            const gameObject = {
                img: sprite,
                update: (delta: number) => {
                    !!update && !sprite.destroyed && update(sprite, delta);
                },
                refComponent: ref
            };
            setGameObject(gameObject);
            addGameObject && addGameObject(gameObject);
            onStart && onStart(sprite, app);
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
