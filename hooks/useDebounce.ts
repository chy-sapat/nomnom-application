import { useEffect } from "react";
import { useTimeout } from "./useTimeout";

/**
 * useDebounce hook
 * @param callback - The function to debounce
 * @param delay - Debounce delay in milliseconds
 * @param dependencies - Dependency array to watch
 */
export const useDebounce = (
  callback: () => void,
  delay: number,
  dependencies: React.DependencyList
): void => {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
};
