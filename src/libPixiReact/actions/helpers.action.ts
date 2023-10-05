import { SpriteSheetStatsProps, SpriteSheetProps } from "@/games/components/Factories/SummonEnemies";
import { AnimatedSprite } from "pixi.js";

export const setImageOptions = (app: any, img: any, options: any): void => {
    const { x, y, width = 30, height = 30, animationSpeed, wrap } = options;
    /*
    * An imgatedSprite inherits all the properties of a PIXI img
    * so you can change its position, its anchor, mask it, etc
    */
    // center the img's anchor point
    img.anchor.set(0.5);

    img.width = width;
    img.height = height;
    
    // move the img to the center of the screen
    img.x = (x ? x : (app.screen.width / 2)) + (width/2);
    img.y = (y ? y : (app.screen.height / 2)) + (height/2);

    if(!!animationSpeed) {
        img.animationSpeed = animationSpeed || 0;
        img.play();
    }

    if(!!wrap) {
        wrap?.addChild?.(img);
    }
    else {
        app.stage.addChild?.(img);
    }
};


export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export const updateRotation = (sprite: any, delta: number) => {
    sprite.rotation += 0.05 * delta;
}

export const updateMovementY = (sprite: any, delta: number, app: any) => {
  sprite.y += 1 * delta;
  if(sprite.y > app.screen.height) {
    sprite.y = 0;
  }
}

export const updateMovementX = (sprite: any, delta: number, app: any) => {
  sprite.x += 1 * delta;
  if(sprite.x > app.screen.width) {
    sprite.x = 0;
  }
}

export const updateMovementXY = (sprite: any, delta: number, app: any) => {
  sprite.x += 1 * delta;
  if(sprite.x > app.screen.width) {
    sprite.x = 0;
  }
  sprite.y += 1 * delta;
  if(sprite.y > app.screen.height) {
    sprite.y = 0;
  }
}

export const updateTileMovementY = (sprite: any, delta: number, app: any) => {
    sprite.tilePosition.y += 2 * delta;
}


export const updateRandow = () => {
    const updateFunctions = [
        updateRotation,
        updateMovementY,
        updateMovementX,
        updateMovementXY
    ];
    const randomIndex = getRandomInt(updateFunctions.length);
    return updateFunctions[randomIndex];
}

export const rectIntersection = (a: any, b: any) => {
    const aRect = a?.getBounds();
    const bRect = b?.getBounds();
    if(!aRect || !bRect) {
      return false;
    }

    return aRect.x + aRect.width > bRect.x &&
           aRect.x < bRect.width + bRect.x &&
           aRect.y + aRect.height > bRect.y &&
           aRect.y < bRect.height + bRect.y;
};

export const randownValues = ({ playerSprite, onColision, screenWidth, screenHeight, defaultProps }: SpriteSheetStatsProps): SpriteSheetProps => {
  const widthHeight = getRandomInt(100);
  return {
    x: getRandomInt(screenWidth),
    y: getRandomInt(screenHeight),
    width: getRandomInt(widthHeight),
    height: getRandomInt(widthHeight),
    animationSpeed: getRandomInt(100)/100,
    stats: {
      speed: 5,
    },
    update: (sprite: AnimatedSprite, delta: number, app: any) => {
      const movementFun = updateRandow();
      movementFun(sprite, delta, app);
      if(rectIntersection(playerSprite?.current, sprite)) {
        onColision(
          sprite,
          {
            hit: getRandomInt(sprite.width),
            other: {
              sprite,
              stats: {
                speed: 5
              }
            }
          }
        )
      }
    },
    ...defaultProps
  };
};
