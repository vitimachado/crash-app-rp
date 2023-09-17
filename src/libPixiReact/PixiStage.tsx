'use client'
import React from "react";
import PixiWrap from "./PixiWrap";

type Props = { children: any }

export default function PixiStage({ children }: Props) {
    return (
        <PixiWrap setWrap={(app: any) => app.stage}>
            { children }
        </PixiWrap>
    );
};
