'use client'
import { Graphics } from "pixi.js";
import React, { useState, useEffect, useCallback } from "react";
import { PixiApplicationContext } from "./PixiApplication";

type Props = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    wrap?: any;
    auxData?: any;
    update?: (graphics:any, delta: number, app?: any, auxData?: any) => void;
    onStart?: (graphics: Graphics, app: any) => void;
};

export const PixiGraphic = (props: Props) => {
    const [init, setInit] = useState(false)
    const { update, onStart, auxData } = props;
    const { app, wrap } = React.useContext<any>(PixiApplicationContext);

    const tick = useCallback(
        (graphics: Graphics, delta: number) => graphics && update && update(graphics, delta, app, auxData),
      [auxData],
    );

    useEffect(() => {
        // create a new Graphics from an image path
        if(!!app && !init) {
            const graphics = new Graphics();
            onStart && onStart(graphics, app);
            // Listen for animate update
            if(!!wrap) {
                wrap?.addChild?.(graphics);
            }
            else {
                app.stage.addChild?.(graphics);
            }
            app.ticker.add((delta: number) => tick(graphics, delta));
            setInit(true);
        }

        return () => {
            app && app?.ticker?.remove?.(tick);
        };
    }, [app]);

    return <></>
};