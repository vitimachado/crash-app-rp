'use client'
import React, { useEffect, useState, useCallback, useRef } from "react";
import PixiSprite from '@/libPixiReact/PixiSprite';
import PixiStage from '@/libPixiReact/PixiStage';
import { InputKeyboardContext } from "@/components/InputKeyboard";
import { handleInput } from "../actions/inputs";
import { PixiApplicationContext } from "@/libPixiReact/PixiApplication";
import { Sprite } from "pixi.js";
import { Explosions } from "./FXs/Explosions";
import { usePrevious } from "@/shared/hook/usePrevious";
import { HorizontalBar } from "./UI/HorizontalBar";

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
    const maxLife = stats?.maxLife ?? 100;
    const [life, setLife] = useState<number>(maxLife);
    const [score, setScore] = useState<number>(0);
    const [alive, setAlived] = useState<boolean>(true);
    const { app } = React.useContext<any>(PixiApplicationContext);
    const lifeRef = useRef<number>();
    const inputsKeyboardRef = useRef();
    const playerRef = useRef();
    const playerDataRef = useRef<any>();

    const [prevLife, currLife] = usePrevious(life);
    const [prevScored, currScored] = usePrevious(score);

    lifeRef.current = life;
    inputsKeyboardRef.current = inputsKeyboard;
    playerRef.current = sprite;
    playerDataRef.current = {
        sprite,
        maxLife,
        life,
        alive,
        score,
        hitted: !!prevLife && !!currLife && (currLife > 0) && (currLife < prevLife),
        addHealth: !!prevLife && !!currLife && (currLife > 0) && (currLife > prevLife),
        scored: !!prevScored && !!currScored && (currScored > 0) && (currScored > prevScored),
        collider
    };

    useEffect(() => {
        if(life <= 0 && alive) {
            
            setAlived(false);
        }
    }, [life])
    

    const update = (sprite: any, delta: number) => {
        if(!playerDataRef?.current?.alive) {
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

    const addHealth = (setLife: React.Dispatch<React.SetStateAction<number>>, health: number) => {
        if(!!health) {
            setLife((prev: number) => prev + health);
        }
    }

    const addScore = (setScore: React.Dispatch<React.SetStateAction<number>>, score: number) => {
        if(!!score) {
            setScore((prev: number) => prev + score);
        }
    }

    const onColision = (_: any, statsOther: any) => {
        if(!playerDataRef?.current?.alive) {
            return;
        }
        statsOther?.hit && damageHit(setLife, statsOther?.hit);
        statsOther?.addHealth && addHealth(setLife, statsOther?.addHealth);
        statsOther?.score && addScore(setScore, statsOther?.score);
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
                    onStart={handleOnStart}
                    destroySprite={!alive} />
                <Explosions />
                {children}
            </PlayerContext.Provider>
        </PixiStage>
    );
};
