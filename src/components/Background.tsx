'use client'
import PixiContainer from '@/libPixiReact/PixiContainer';
import { PixiTiling } from '@/libPixiReact/PixiTiling';

type Props = { children: any, update?: any, backgroundURL?: string }

export const Background = ({ backgroundURL = '/imgs/bg/sky01.png', update, children }: Props) =>
{
  const updateTileMovementY = (sprite: any, delta: number, app: any) => {
      sprite.tilePosition.y += 2 * delta;
  }

  return (
    <PixiContainer>
      <PixiTiling imageURL={backgroundURL} update={update || updateTileMovementY} />
      {children}
    </PixiContainer>
  );
};