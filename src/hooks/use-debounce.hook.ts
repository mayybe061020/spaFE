import { useState } from "react";
import { useDebounce } from "use-debounce";

const UseDebounceHook = <T = string>(debouncedBy = 300) => {
  const [debounceValue, setDebounceValue] = useState<T | undefined>();
  const [debounced, { isPending }] = useDebounce(debounceValue, debouncedBy);

  return {
    onChange: setDebounceValue,
    value: debounced,
    isDebouncing: isPending,
  };
};

export default UseDebounceHook;
