import { MutableRefObject, ReactNode } from "react";

export type ListenerProps<State, Selected> = {
  key: string;
  select: (state: State) => Selected;
  callback: (selected: Selected) => void;
};

export type RefProps<State> = {
  context: State;
  addListener: <Selected>(row: ListenerProps<State, Selected>) => void;
  removeListener: (key: string) => void;
  listeners: ListenerProps<State, any>[];
};

export type ContextSelector<State> = {
  Context: React.Context<MutableRefObject<RefProps<State>>>;
  Provider: React.MemoExoticComponent<React.FC<{ children: ReactNode }>>;
  useSelector: <T>(callback: (state: State) => T) => T;
};

export type SelectorComponentProps<State> = {
  context: React.Context<State>;
  reference: MutableRefObject<RefProps<State>>;
};

export type ListenerBindingProps<State> = {
  context: React.Context<State>;
  select: (state: State) => any;
  callback: (selected: any) => void;
};

export type CustomSelector<State> = <T>(filter: (state: State) => T) => T;
