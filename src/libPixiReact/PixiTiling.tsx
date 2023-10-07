import { Texture, TilingSprite } from "pixi.js";
import React, { useEffect } from "react";
import { ImagePixi, PixiApplicationContext } from "./PixiApplication";

const pattern = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/p2.jpeg'

type Props = { imageURL: string; x?: number; y?: number; width?: number; height?: number; update: (sprite: ImagePixi, delta: number) => void; wrap?: any; };

export const PixiTiling = ({ imageURL, x, y, width, height, update, wrap }: Props) => {
    const { screenWidth, screenHeight, addGameObject, destroyGameObject } = React.useContext<PixiApplicationContext>(PixiApplicationContext);

    useEffect(() => {
        // create a new Sprite from an image path
        const texture = Texture.from(imageURL || pattern);
        const tilingSprite = new TilingSprite(texture, (!!width ? width : screenWidth), (!!height ? height : screenHeight));
        const gameObject = {
            img: tilingSprite,
            update: (delta: number) => {
                !!update && !tilingSprite.destroyed && update(tilingSprite, delta);
            }
        };
        addGameObject && addGameObject(gameObject);

        return () => {
            destroyGameObject && destroyGameObject(gameObject);
        };
    }, []);

    return <></>
};
