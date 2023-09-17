'use client'
import { Sprite } from "pixi.js";
import React, { useEffect } from "react";
import { PixiApplicationContext } from "./PixiApplication";
import { setImageOptions } from "./actions/helpers.action";

type Props = {
    imageURL: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    wrap?: any;
    update?: (sprite:any, delta: number, app?: any) => void;
    onStart?: (sprite: Sprite) => void;
};

export const PixiSprite = (props: Props) => {
    const { imageURL, x, y, width = 30, height = 30, update, wrap, onStart } = props;
    const { app } = React.useContext<any>(PixiApplicationContext);

    useEffect(() => {
        // create a new Sprite from an image path
        const sprite = Sprite.from(imageURL);
        const tick = (delta: number) => update && update(sprite, delta, app);
        if(!!app) {
            setImageOptions(app, sprite, props);
            onStart && onStart(sprite);
            // Listen for animate update
            app.ticker.add(tick);
        }

        return () => {
            app.ticker.remove(tick);
        };
    }, [app, wrap]);

    return <></>
};