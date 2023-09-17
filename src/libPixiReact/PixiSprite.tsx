'use client'
import { Sprite } from "pixi.js";
import React, { useState, useEffect, useCallback } from "react";
import { PixiApplicationContext } from "./PixiApplication";
import { setImageOptions } from "./actions/helpers.action";

type Props = {
    imageURL: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    wrap?: any;
    auxData?: any;
    update?: (sprite:any, delta: number, app?: any, auxData?: any) => void;
    onStart?: (sprite: Sprite, app: any) => void;
};

export const PixiSprite = (props: Props) => {
    const [init, setInit] = useState(false)
    const { imageURL, update, onStart, auxData } = props;
    console.log("🚀 ~ file: PixiSprite.tsx:22 ~ PixiSprite ~ auxData:", auxData?.arrowDown)
    const { app } = React.useContext<any>(PixiApplicationContext);

    const tick = useCallback(
        (sprite: Sprite, delta: number) => sprite && update && update(sprite, delta, app, auxData),
      [auxData],
    );

    useEffect(() => {
        // create a new Sprite from an image path
        if(!!app && !init) {
            const sprite = Sprite.from(imageURL);
            setImageOptions(app, sprite, props);
            onStart && onStart(sprite, app);
            // Listen for animate update
            app.ticker.add((delta: number) => tick(sprite, delta));
            setInit(true);
        }

        return () => {
            app && app?.ticker?.remove?.(tick);
        };
    }, [app]);

    return <></>
};