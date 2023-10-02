'use client'
import React, { useState } from "react";
import { Application, Assets } from "pixi.js";
import { ReactNode, useEffect, useRef } from 'react';

type Props = { children: ReactNode }

export const PixiApplicationContext = React.createContext({});

export default function PixiApplication({ children }: Props) {
    const [app, setApp] = useState<any>();
    const [assets, setAssets] = useState<any>();
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Start Application the PixiJS app
        const app = new Application({ background: '#000000', resizeTo: window });
        if(!!app?.view?.style) {
            // @ts-ignore
            app.view.style.margin = 'auto';
            app.view.style.height = '85vh';
            // @ts-ignore
            if(ref?.current) ref.current.appendChild(app.view);

            const assets = Assets;
            setAssets(assets);
            setApp(app);
        }

        return () => {
            setApp(null);
            app.destroy(true, true);
        };
    }, []);

    return (
        <PixiApplicationContext.Provider value={{ app, assets, screenWidth: app?.screen?.width, screenHeight: app?.screen?.height }}>
            <div ref={ref}>{children}</div>
        </PixiApplicationContext.Provider>
    )
};
