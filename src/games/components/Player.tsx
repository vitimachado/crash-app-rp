'use client'
import React, { useEffect, useState, useCallback, useRef } from "react";
import { PixiSprite } from '@/libPixiReact/PixiSprite';
import PixiStage from '@/libPixiReact/PixiStage';
import { InputKeyboardContext } from "@/components/InputKeyboard";
import { handleInput } from "../actions/inputs";
import { PixiApplicationContext } from "@/libPixiReact/PixiApplication";
import { Sprite } from "pixi.js";
import { Explosions } from "./FXs/Explosions";
import { usePrevious } from "@/shared/hook/usePrevious";

type Props = {
    children: any;
    imageURL: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    wrap?: any;
    update?: (sprite:any, delta: number, app?: any) => void;
    stats?: {
        speed?: number;
        maxLife?: number;
    }
};

export const PlayerContext = React.createContext({});

export const Player = (props: Props) => {
    const [sprite, setSprite] = useState<any>();
    const [collider, setCollider] = useState<any>();
    const { inputsKeyboard } = React.useContext<any>(InputKeyboardContext);
    const { imageURL = '/imgs/ufo1.png', width = 100, height = 100, stats, children } = props;
    const [life, setLife] = useState<number>(stats?.maxLife ?? 100);
    const [alive, setAlived] = useState<boolean>(false);
    const { app } = React.useContext<any>(PixiApplicationContext);
    const inputsKeyboardRef = useRef();
    const playerRef = useRef();
    const playerDataRef = useRef<any>();

    const [prevLife, currLife] = usePrevious(life);

    inputsKeyboardRef.current = inputsKeyboard;
    playerRef.current = sprite;
    playerDataRef.current = {
        sprite,
        life,
        alive,
        hitted: !!prevLife && !!currLife && currLife > 0 && prevLife !== currLife,
        collider
    };

    useEffect(() => {
        if(life <= 0 && alive) {
            app.stage.removeChild(sprite);
            setAlived(false);
        }
    }, [life])
    

    const update = (sprite: any, delta: number, app: any) => {
        if(!sprite) {
            return;
        }
        sprite.rotation += 0.05 * delta;
        handleInput(sprite, app, inputsKeyboardRef.current, stats)
    }

    const handleOnStart = (sprite: any, app: any) => {
        setSprite(sprite);
        setAlived(true);
    }

    const damageHit = (setLife: React.Dispatch<React.SetStateAction<number>>, hit: number) => {
        if(!!hit) {
            setLife((prev: number) => prev - hit);
        }
    }

    const onColision = (_: any, statsOther: any) => {
        damageHit(setLife, statsOther?.hit);
        setCollider(statsOther?.other)
    }

    return (
        <PixiStage>
            <PlayerContext.Provider value={{ playerSprite: playerRef, onColision, playerDataRef }}>
                <PixiSprite
                    imageURL={imageURL}
                    width={width}
                    height={height}
                    update={update}
                    onStart={handleOnStart} />
                <Explosions />
                {children}
            </PlayerContext.Provider>
        </PixiStage>
    );
};
