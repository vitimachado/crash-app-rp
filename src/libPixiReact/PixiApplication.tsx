'use client'
import React, { useState } from "react";
import { AnimatedSprite, Application, Assets, Graphics, Sprite, TilingSprite } from "pixi.js";
import { ReactNode, useEffect, useRef } from 'react';

type Props = { children: ReactNode }

export type ImagePixi = Sprite | TilingSprite | Graphics | AnimatedSprite;

export interface GameObject {
    img: ImagePixi;
    update: (delta: number) => void;
    refComponent?: React.ForwardedRef<any>;
}

export interface PixiApplicationContext {
    app?: Application | null,
    assets?: any;
    screenWidth?: number;
    screenHeight?: number;
    addGameObject?: (gameObject: GameObject) => void;
    destroyGameObject?: (gameObject: GameObject) => void;
};

export const PixiApplicationContext = React.createContext<PixiApplicationContext>({});

export default function PixiApplication({ children }: Props) {
    const [app, setApp] = useState<Application | null>();
    const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
    const [assets, setAssets] = useState<any>();
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const application = new Application({ background: '#000000', resizeTo: window });
        if(!!application?.view?.style) {
            // @ts-ignore
            application.view.style.margin = 'auto';
            application.view.style.height = '85vh';
            // @ts-ignore
            if(ref?.current) ref.current.appendChild(application.view);

            const assetsGame = Assets;
            setAssets(assetsGame);
            setApp(application);
        }

        return () => {
            destroyAll();
        };
    }, []);

    const addGameObject = (gameObject: GameObject) => {
        if(!app) {
            return;
        }
        app.stage.addChild(gameObject.img);
        app.ticker.add(gameObject.update);
        setGameObjects(prev => [...prev, gameObject]);
    }

    function destroyGameObject(gameObject: GameObject) {
        app?.stage.removeChild(gameObject.img);
        app?.ticker.remove(gameObject.update);
        gameObject?.img.destroy();
        setGameObjects(prev => prev.filter(o => o !== gameObject));
    }

    function destroyAll() {
        gameObjects.forEach(gameObject => {
            app?.stage.removeChild(gameObject.img);
            app?.ticker.remove(gameObject.update);
            gameObject?.img.destroy();
        });
        setApp(null);
        app?.destroy(true, true);
    }

    return (
        <PixiApplicationContext.Provider value={{ app, assets, screenWidth: app?.screen?.width, screenHeight: app?.screen?.height, addGameObject, destroyGameObject }}>
            <div ref={ref}>{ !!app ? children : <>Loading</> }</div>
        </PixiApplicationContext.Provider>
    )
};
