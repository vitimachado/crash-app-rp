'use client'
import React, { useEffect, useReducer } from "react";

type Props = { children: any; };

export const InputKeyboardContext = React.createContext({});

const initialState = {
    arrowRight: false,
    arrowLeft: false,
    arrowUp: false,
    arrowDown: false
};
  
function reducer(state: typeof initialState, action: any) {
    const keyboardStatus = !!action?.keydown ? true: false;
    switch (action.type) {
        case 'ArrowRight':
            return { ...state, arrowRight: keyboardStatus };
        case 'ArrowLeft':
            return { ...state, arrowLeft: keyboardStatus };
        case 'ArrowUp':
            return { ...state, arrowUp: keyboardStatus };
        case 'ArrowDown':
            return { ...state, arrowDown: keyboardStatus };
        case 'reset':
            return initialState;
        default:
            return state;
    }
}

export const InputKeyboard = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addEventListeners = () =>{
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
    }
    
    const removeEventListeners = () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
    }
    
    const downHandler = (event:KeyboardEvent) => {
        dispatch({ type: event.key, keydown: true });
    }
    
    const upHandler = (event:KeyboardEvent) => {
        dispatch({ type: event.key, keydown: false });
    }

    useEffect(() => {
        addEventListeners();

        return () => {
            removeEventListeners();
        };
    }, []);

    return (
        <InputKeyboardContext.Provider value={{ inputsKeyboard: state }}>
            {children}
        </InputKeyboardContext.Provider>
    )
};