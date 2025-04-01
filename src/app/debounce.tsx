import {DependencyList} from "react";
import { useEffect, useCallback } from 'react';
// https://stackoverflow.com/questions/69727243/react-search-using-debounce
export default function useDebounce(effect: Function, dependencies: DependencyList, delay: number) {
    const callback = useCallback(effect, dependencies);

    useEffect(() => {
        const timeout = setTimeout(callback, delay);
        return () => clearTimeout(timeout);
    }, [callback, delay]);
}
