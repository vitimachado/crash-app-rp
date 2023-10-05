'use client'
import React, { useEffect } from "react";
import { PixiApplicationContext } from "./PixiApplication";
import { Assets, AnimatedSprite, Application } from "pixi.js";
import { setImageOptions } from "./actions/helpers.action";

export type IPixiSpriteSheet = {
    jsonURL: string;
    wrap?: any;
    update?: (img:any, delta: number, app?: Application) => void;
    onStart?: (animatedSprite: AnimatedSprite) => void;
    onLoad?: (animatedSprite: AnimatedSprite, app?: Application) => void;
};

export const PixiSpriteSheet = (props: IPixiSpriteSheet) => {
    const { jsonURL, update, onLoad } = props;
    const { app, assets, onStart } = React.useContext<any>(PixiApplicationContext);

    useEffect(() => {
        const tick = (anim: any, delta: number) => update && update(anim, delta, app);
        if(!!app && !!assets && !!jsonURL) {
            Assets.load(jsonURL).then((spritesheet) => {
                const textures = Object.values(spritesheet?.textures) as any;

                const anim = new AnimatedSprite(textures);
                setImageOptions(app, anim, props);
                onStart && onStart(anim);
                onLoad && onLoad(anim, app);

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
