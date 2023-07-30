import { useState, useEffect, useRef } from "react";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
	const [value, setValue] = useState(fallbackValue);
	const initialValue = useRef(null)
	useEffect(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem(key);
			const newValue = stored ? JSON.parse(stored) : fallbackValue
			setValue(newValue);
			initialValue.current = newValue
		}
	}, []);

	useEffect(() => {

		if (typeof window !== "undefined") {
			if (initialValue.current !== null && value !== initialValue.current) {
				localStorage.setItem(key, JSON.stringify(initialValue.current))
				initialValue.current = null
			} else {
				localStorage.setItem(key, JSON.stringify(value))
			}
		}
	}, [value])

	return [value, setValue] as const;
}
