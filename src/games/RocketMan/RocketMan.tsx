'use client'
import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';
import PixiApplication from '@/libPixiReact/PixiApplication';
import { PixiSprite } from '@/libPixiReact/PixiSprite';
import PixiStage from '@/libPixiReact/PixiStage';
import { PixiTiling } from '@/libPixiReact/PixiTiling';
import { PixiSpriteSheet } from '@/libPixiReact/PixiSpriteSheet';
import { Background } from '@/components/Background';
import { Player } from '@/games/components/Player';
import { InputKeyboard } from '@/components/InputKeyboard';
import { SummonEnemies } from '../components/SummonEnemies';

export const RocketMan = () =>
{
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  return (
    <PixiApplication>
      <InputKeyboard>
        <Background backgroundURL='/imgs/bg/sky01.png'>
          <Player imageURL='/imgs/ufo1.png'>
            <SummonEnemies jsonURL={'/imgs/sprites/meteorite_sprite.json'} randomNumber={30}/>
          </Player>
        </Background>
      </InputKeyboard>
    </PixiApplication>
  );
};