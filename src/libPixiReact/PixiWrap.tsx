'use client'
import React from "react";
import { PixiApplicationContext } from "./PixiApplication";

type Props = { children: any, setWrap: any }

export default function PixiWrap({ children, setWrap }: Props) {
    const { app } = React.useContext<any>(PixiApplicationContext);

    if(!app) {
        return <></>;
    }

    return React.Children.map(children, child =>  ({ ...child, props: { ...child.props, wrap: setWrap(app) } }) );
};
