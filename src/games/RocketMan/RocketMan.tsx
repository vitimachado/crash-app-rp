'use client'
import PixiApplication from '@/libPixiReact/PixiApplication';
import { Background } from '@/components/Background';
import { Player } from '@/games/components/Player';
import { InputKeyboard } from '@/components/InputKeyboard';
import { SummonEnemies } from '../components/SummonEnemies';

export const RocketMan = () =>
{
  return (
    <PixiApplication>
      <InputKeyboard>
        <Background backgroundURL='/imgs/bg/sky01.png'>
          <Player imageURL='/imgs/ufo1.png'>
            <SummonEnemies jsonURL={'/imgs/sprites/meteorite_sprite.json'} randomNumber={10}/>
          </Player>
        </Background>
      </InputKeyboard>
    </PixiApplication>
  );
};