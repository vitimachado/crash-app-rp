'use client'
import { PixiTiling } from '@/libPixiReact/PixiTiling';
import { TilingSprite } from 'pixi.js';

type Props = { children: any, update?: any, backgroundURL?: string }

export const Background = ({ backgroundURL = '', update, children }: Props) =>
{
  const updateTileMovementY = (sprite: TilingSprite, delta: number) => {
    if(sprite?.tilePosition) {
      sprite.tilePosition.y += 2 * delta;
    }
  }

  return (
    <div>
      <PixiTiling imageURL={backgroundURL} update={update || updateTileMovementY} />
      {children}
    </div>
  );
};