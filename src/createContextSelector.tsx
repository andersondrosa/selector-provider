import React, { createContext, useRef, memo } from "react";
import { ContextSelector, RefProps } from "./types";
import { ListenerComponent } from "./ListenerComponent";
import { useContextSelector } from "./useContextSelector";

export function createContextSelector<State>(
  context: React.Context<State>
): ContextSelector<State> {
  const SelectorContext = createContext<
    React.MutableRefObject<RefProps<State>>
  >({} as any);

  const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    //
    const ref = useRef<RefProps<State>>({
      context: {} as any,
      addListener: () => {},
      removeListener: () => {},
      listeners: [],
    });

    return (
      <>
        <ListenerComponent context={context} reference={ref} />
        <SelectorContext.Provider value={ref}>
          {children}
        </SelectorContext.Provider>
      </>
    );
  };

  const MemoizedProvider = memo(Provider) as React.MemoExoticComponent<
    React.FC<{ children: React.ReactNode }>
  >;

  const useSelector = <T,>(callback: (state: State) => T): T => {
    return useContextSelector(SelectorContext, callback);
  };

  return { Context: SelectorContext, Provider: MemoizedProvider, useSelector };
}
