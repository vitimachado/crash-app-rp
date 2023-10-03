import { usePrevious } from "./usePrevious"

export const useHasChanged = (val: any) => {
    const [prevVal] = usePrevious(val)
    return prevVal !== val;
}