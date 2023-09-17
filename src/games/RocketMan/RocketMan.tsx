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

export const RocketMan = () =>
{
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  const updateRotation = (sprite: any, delta: number) => {
      sprite.rotation += 0.05 * delta;
  }

  const updateMovementY = (sprite: any, delta: number, app: any) => {
    sprite.y += 1 * delta;
    if(sprite.y > app.screen.height) {
      sprite.y = 0;
    }
  }

  const updateMovementX = (sprite: any, delta: number, app: any) => {
    sprite.x += 1 * delta;
    if(sprite.x > app.screen.width) {
      sprite.x = 0;
    }
  }

  const updateMovementXY = (sprite: any, delta: number, app: any) => {
    sprite.x += 1 * delta;
    if(sprite.x > app.screen.width) {
      sprite.x = 0;
    }
    sprite.y += 1 * delta;
    if(sprite.y > app.screen.height) {
      sprite.y = 0;
    }
  }

  const updateTileMovementY = (sprite: any, delta: number, app: any) => {
      sprite.tilePosition.y += 2 * delta;
  }

  return (
    <PixiApplication>
      <InputKeyboard>
        <Background>
          <Player imageURL='/imgs/ufo1.png' />
          <PixiSpriteSheet jsonURL='/imgs/sprites/meteorite_sprite.json' animationSpeed={0.2} update={updateMovementX} />
          <PixiSpriteSheet jsonURL='/imgs/sprites/meteorite_sprite.json' animationSpeed={0.3} x={300} y={90} update={updateMovementXY} />
          <PixiSpriteSheet jsonURL='/imgs/sprites/meteorite_sprite.json' animationSpeed={0.1} x={50} y={50} update={updateMovementX} />
          <PixiSpriteSheet jsonURL='/imgs/sprites/meteorite_sprite.json' animationSpeed={1} x={1000} update={updateMovementY} />
        </Background>
      </InputKeyboard>
    </PixiApplication>
  );
};