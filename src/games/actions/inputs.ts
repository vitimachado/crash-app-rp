import { defaultPlayerSpeed } from "@/configs/constants";

export const handleInput = (sprite: any, app: any, inputsKeyboard: any, stats: any) => {
    if(inputsKeyboard?.arrowDown) {
        const value = sprite.y + (stats?.speed || defaultPlayerSpeed);
        if(value < app.screen.height) {
            sprite.y = value;
        }
    }
    if(inputsKeyboard?.arrowUp) {
        const value = sprite.y - (stats?.speed || defaultPlayerSpeed);
        if(value > 0) {
            sprite.y = value;
        }
        else {
            sprite.y = 0; 
        }
    }
    if(inputsKeyboard?.arrowRight) {
        const value = sprite.x + (stats?.speed || defaultPlayerSpeed);
        if(sprite.x < app.screen.width) {
            sprite.x = value;
        }
    }
    if(inputsKeyboard?.arrowLeft) {
        const value = sprite.x - (stats?.speed || defaultPlayerSpeed);
        if(sprite.x > 0) {
            sprite.x = value;
        }
    }
}