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

    if(animationSpeed !== undefined) {
        console.log("🚀 ~ file: helpers.action.ts:18 ~ setImageOptions ~ spriteSpeed:", animationSpeed)
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