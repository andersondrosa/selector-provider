import { useContext } from "react";
import { SelectorComponentProps } from "./types";

export const ContextBinding = <State,>({
  context,
  reference,
}: SelectorComponentProps<State>) => {
  reference.current.context = useContext(context); // Sem erro
  return null;
};