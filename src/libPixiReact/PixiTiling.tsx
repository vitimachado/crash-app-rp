import { Texture, TilingSprite } from "pixi.js";
import React, { useEffect } from "react";
import { PixiApplicationContext } from "./PixiApplication";

const pattern = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/p2.jpeg'

type Props = { imageURL: string; x?: number; y?: number; width?: number; height?: number; update?: (sprite:any, delta: number, app?: any) => void; wrap?: any; };

export const PixiTiling = ({ imageURL, x, y, width, height, update, wrap }: Props) => {
    const { app } = React.useContext<any>(PixiApplicationContext);

    useEffect(() => {
        // create a new Sprite from an image path
        const texture = Texture.from(imageURL || pattern);
        const tilingSprite = new TilingSprite(texture, (width ? width : (app.screen.width)), (height ? height : (app.screen.height)));
        const tick = (delta: number) => update && update(tilingSprite, delta, app);
        if(!!app) {
            if(!!wrap) {
                wrap?.addChild?.(tilingSprite);
            }
            
            // Listen for animate update
            app.ticker.add(tick);
        }

        return () => {
            app.ticker.remove(tick);
        };
    }, [app, wrap]);

    return <></>
};
// class Tiling extends React.Component {
//   count = 0;

//   state = {
//     tileScale: { x: 1, y: 1 },
//     tilePosition: { x: 0, y: 0 }
//   };

//   componentDidMount() {
//     this.props.app.ticker.add(this.tick);
//   }

//   componentWillUnmount() {
//     this.props.app.ticker.remove(this.tick);
//   }

//   tick = delta => {
//     this.count += 0.005 * delta;

//     this.setState(state => ({
//       tileScale: {
//         x: 2 + Math.sin(this.count),
//         y: 2 + Math.cos(this.count)
//       },
//       tilePosition: {
//         x: state.tilePosition.x + 1,
//         y: state.tilePosition.y + 1
//       }
//     }));
//   };

//   render() {
//     return (
//       <TilingSprite
//         image={pattern}
//         width={500}
//         height={500}
//         tilePosition={this.state.tilePosition}
//         tileScale={this.state.tileScale}
//       />
//     );
//   }
// }