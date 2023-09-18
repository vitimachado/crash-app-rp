'use client'
import { Sprite } from "pixi.js";
import React, { useEffect, useState } from "react";
import { PixiApplicationContext } from "./PixiApplication";
import { Assets, Loader, AnimatedSprite, Texture } from "pixi.js";
import data from './../../public/imgs/sprites/meteorite_sprite.json';
import { setImageOptions } from "./actions/helpers.action";

type Props = {
    jsonURL: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    animationSpeed?: number;
    wrap?: any;
    update?: (img:any, delta: number, app?: any) => void;
    onStart?: (animatedSprite: AnimatedSprite) => void;
};

export const PixiSpriteSheet = (props: Props) => {
    const { jsonURL, update } = props;
    const { app, assets, onStart } = React.useContext<any>(PixiApplicationContext);

    useEffect(() => {
        const tick = (anim: any, delta: number) => update && update(anim, delta, app);
        if(!!app && !!assets && !!jsonURL) {
            Assets.load(jsonURL).then((spritesheet) => {
                const textures = Object.values(spritesheet?.textures) as any;

                // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
                const anim = new AnimatedSprite(textures);
                setImageOptions(app, anim, props);
                onStart && onStart(anim);

                // // Listen for animate update
                app.ticker.add((delta: number) => {tick(anim, delta)});
            });
        }

        return () => {
            app && app?.ticker?.remove?.(tick);
            Assets.unload(jsonURL);
        };
    }, [app]);

    return <></>
};