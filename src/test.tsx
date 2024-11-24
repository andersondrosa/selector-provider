import { createContext } from "react";
import { useContextSelector } from "./useContextSelector";
import { createContextSelector } from "./createContextSelector";
import { CustomSelector } from "./types";

type State = {
  name: string;
};

const DBContext = createContext<State>({ name: "test" });

const { Context, useSelector, Provider } = createContextSelector(DBContext);

function TestComponent() {
  //
  const useCustomSelector: CustomSelector<State> = (filter) =>
    useContextSelector(Context, filter);

  useCustomSelector((state) => state.name);

  const str = useSelector((x) => x.name);

  return <div>{str}</div>;
}

export function TestPage() {
  return (
    <DBContext.Provider value={{ name: "test" }}>
      <Provider>
        <TestComponent />
      </Provider>
    </DBContext.Provider>
  );
}
