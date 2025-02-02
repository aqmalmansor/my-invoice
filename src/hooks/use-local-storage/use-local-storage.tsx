import { useCallback, useState } from "react";

interface LocalStorageProps<T> {
  key: string;
  initValue: T;
}

export const useLocalStorage = <T,>({
  key,
  initValue,
}: LocalStorageProps<T>) => {
  const parsedLocalStorage = JSON.parse(localStorage.getItem(key) || "{}");
  const initialValue =
    Object.keys(parsedLocalStorage).length > 0 ? parsedLocalStorage : initValue;

  const [localStorageState, setLocalStorageState] = useState<T>(initialValue);

  const handleUpdateLocalStorageState = useCallback(
    (x: T) => {
      setLocalStorageState(x);
      localStorage.setItem(key, JSON.stringify(x));
    },
    [key],
  );

  return {
    localStorageState,
    handleUpdateLocalStorageState,
  };
};
