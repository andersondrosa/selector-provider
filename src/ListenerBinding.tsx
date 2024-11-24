// ListenerBinding.tsx
import { useContext, useEffect } from "react";
import { ListenerBindingProps } from "./types";

export const ListenerBinding = <State,>({
  context,
  select,
  callback,
}: ListenerBindingProps<State>) => {
  const selected = select(useContext(context));

  useEffect(() => {
    callback(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return null;
};
