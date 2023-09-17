'use client'
import React from "react";
import PixiWrap from "./PixiWrap";
import { Container } from "pixi.js";

type Props = { children: any, wrap?: any }

export default function PixiContainer({ children, wrap }: Props) {
    return (
        <PixiWrap setWrap={(app: any) => {
            const rc = new Container();
            if(!!wrap) {
                wrap?.addChild?.(rc);
            }
            else {
                app.stage.addChild?.(rc);
            }
            return rc;
        }}>
            { children }
        </PixiWrap>
    );
};
