import React, { useState } from "react";
import { RefProps, ListenerProps } from "./types";
import { ContextBinding } from "./ContextBinding";
import { ListenerBinding } from "./ListenerBinding";

type ListenerComponentProps<State> = {
  context: React.Context<State>;
  reference: React.MutableRefObject<RefProps<State>>;
};

export const ListenerComponent = <State,>({
  context,
  reference,
}: ListenerComponentProps<State>) => {
  const [listeners, setListeners] = useState<ListenerProps<State, any>[]>([]);

  reference.current.addListener = (row) => setListeners((prev) => [...prev, row]);

  reference.current.removeListener = (key) =>
    setListeners((prev) => prev.filter((listener) => listener.key !== key));

  return (
    <>
      <ContextBinding context={context} reference={reference} />
      {listeners.map(({ key, select, callback }) => (
        <ListenerBinding
          key={key}
          context={context}
          select={select}
          callback={callback}
        />
      ))}
    </>
  );
};
