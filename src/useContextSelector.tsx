import { useContext, useEffect, useState } from "react";
import { RefProps } from "./types";

export function useContextSelector<State, FilteredState>(
  SelectorContext: React.Context<React.MutableRefObject<RefProps<State>>>,
  select: (state: State) => FilteredState
): FilteredState {
  const ref = useContext(SelectorContext);
  if (!ref)
    throw new Error("useContextSelector must be used within its Provider");

  const [state, setState] = useState<FilteredState>(() =>
    select(ref.current.context as State)
  );

  useEffect(() => {
    const key = Math.random().toString(36).substring(2, 15);

    ref.current.addListener({
      key,
      select,
      callback: (result: FilteredState) => setState(result),
    });

    return () => ref.current.removeListener(key);
  }, []);

  return state;
}
