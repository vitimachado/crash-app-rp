'use client'
import React, { useEffect } from "react";
import { PixiApplicationContext } from "./PixiApplication";
import { Assets, AnimatedSprite } from "pixi.js";
import { setImageOptions } from "./actions/helpers.action";

type Props = {
    jsonURL: string;
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

                const anim = new AnimatedSprite(textures);
                setImageOptions(app, anim, props);
                onStart && onStart(anim);

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
