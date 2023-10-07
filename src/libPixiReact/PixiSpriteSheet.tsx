'use client'
import React, { useEffect, useState } from "react";
import { GameObject, PixiApplicationContext } from "./PixiApplication";
import { Assets, AnimatedSprite, Application } from "pixi.js";
import { setImageOptions } from "./actions/helpers.action";

export type ObjectsFuctions = { destroyObject: (() => void) | undefined }

export type PixiSpriteSheet = {
    jsonURL?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    animationSpeed?: number;
    stats?: {
        speed?: number;
    };
    wrap?: any;
    destroySpriteSheet?: boolean;
    update?: (sprite: AnimatedSprite, delta: number, app: any, destroyGameObject?: any) => void;
    onStart?: (sprite: AnimatedSprite, app?: any) => void;
    onLoad?: (animatedSprite: AnimatedSprite, app?: Application) => void;
    destroyObject?: () => void;
    rebirthObject?: (value: number) => void;
    resetObjects?: () => void;
};

export const PixiSpriteSheet = React.forwardRef((props: PixiSpriteSheet, ref) => {
    const [gameObject, setGameObject] = useState<GameObject | undefined>();
    const { jsonURL, destroySpriteSheet, update, onStart, onLoad } = props;
    const { app, screenWidth, screenHeight, addGameObject, destroyGameObject } = React.useContext<PixiApplicationContext>(PixiApplicationContext);

    useEffect(() => {
        !gameObject && jsonURL && Assets.load(jsonURL).then((spritesheet) => {
            const textures = Object.values(spritesheet?.textures) as any;

            const anim = new AnimatedSprite(textures);
            setImageOptions(anim, { ...props, screenWidth, screenHeight });
            const gameObject = {
                img: anim,
                update: (delta: number) => {
                    !!update && !anim.destroyed && update(anim, delta, app)
                },
                refComponent: ref
            };
            setGameObject(gameObject);
            addGameObject && addGameObject(gameObject);
            onStart && onStart(anim);
            onLoad && app && onLoad(anim, app);
        });

        return () => {
            !!destroyGameObject && !!gameObject && destroyGameObject(gameObject);
        };
    }, []);

    useEffect(() => {
        if(!!destroySpriteSheet && !!gameObject) {
            destroyGameObject && destroyGameObject(gameObject);
            setGameObject(undefined);
        }
    }, [destroySpriteSheet]);

    return <></>
});