'use client'
import React, { useRef } from "react";
import PixiText, { IPixiText } from "@/libPixiReact/PixiText";
import { Text } from "pixi.js";

export const TextField = (props: IPixiText) => {
    const currentValue = useRef(props.text);
    currentValue.current = props.text;

	const handleUpdate = (textPixi: Text, delta:number) => {
		if(!textPixi || textPixi.destroyed) {
			return;
		}

        if(!!currentValue?.current) {
			textPixi.text = currentValue?.current;
        }
    };

	return (
		<PixiText update={handleUpdate} {...props} />
	);
};
