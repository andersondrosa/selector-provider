import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  forwardRef,
  memo,
  Dispatch,
  SetStateAction,
  MutableRefObject,
  MemoExoticComponent,
  ReactNode,
} from "react";

const uid = () =>
  Math.random()
    .toString()
    .substring(2, 13);

type ListenerProps = {
  key: string;
  select: (state: any) => any;
  callback: Dispatch<SetStateAction<null>>;
};

type RefProps = {
  context(context: any): any;
  addListener: (row: ListenerProps) => void;
  removeListener: (key: string) => void;
  listeners: ListenerProps[];
};

const ContextBinding = ({
  context,
  reference: ref,
}: {
  context: React.Context<any>;
  reference: MutableRefObject<RefProps>;
}) => {
  ref.current.context = useContext(context);
  return <></>;
};

const ListenerBinding = ({
  context,
  select,
  callback,
}: {
  context: React.Context<any>;
  select: (context: any) => any;
  callback: (selected: any) => any;
}) => {
  const selected = select(useContext(context));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => (callback(selected), undefined), [selected]);
  return <></>;
};

const ListenerComponent = (
  { context: Context }: { context: React.Context<any> },
  ref: MutableRefObject<RefProps>
) => {
  const [listeners, setListeners] = useState<ListenerProps[]>([]);
  ref.current.addListener = (row) => setListeners((list) => [...list, row]);
  ref.current.removeListener = (id) =>
    setListeners((list) => list.filter((x) => x.key != id));
  return (
    <div className="flex gap-2">
      <ContextBinding context={Context} reference={ref} />
      {listeners.map(({ key, select, callback }) => (
        <ListenerBinding
          key={key}
          context={Context}
          select={select}
          callback={callback}
        />
      ))}
    </div>
  );
};

const Listener = forwardRef(ListenerComponent);

type ContextSelector = {
  Context: React.Context<React.MutableRefObject<RefProps> | null>;
  Provider: MemoExoticComponent<any>;
};

export function createSelector(context): ContextSelector {
  const SelectorContext = createContext<MutableRefObject<RefProps> | null>(
    null
  );
  const Provider = ({ children }) => {
    const ref = useRef({} as RefProps);
    return (
      <>
        <Listener ref={ref} context={context} />
        <SelectorContext.Provider value={ref}>
          {children}
        </SelectorContext.Provider>
      </>
    );
  };

  return { Context: SelectorContext, Provider: memo(Provider) };
}

export function useContextSelector(
  SelectorContext: any,
  select: (context: any) => any
) {
  const ref: MutableRefObject<RefProps> = useContext(SelectorContext.Context);
  const [state, setState] = useState({
    result: select(ref?.current.context || {}),
  });

  useEffect(() => {
    const key = uid();
    ref != undefined &&
      ref.current.addListener({
        key,
        select,
        callback: (result) => setState({ result }),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => (ref && ref.current.removeListener(key), undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return state.result;
}
