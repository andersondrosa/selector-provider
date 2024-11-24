# Selector para React Context

O componente **Selector para React Context** foi desenvolvido para adicionar funcionalidade de seleção ao contexto do React, semelhante ao Redux Selector. Este componente aprimora a eficiência e modularidade ao trabalhar com estados globais no React.

## Características Técnicas

- **Isolamento de Seleção:** Permite a seleção de partes específicas do estado armazenado no Context, evitando re-renderizações desnecessárias e melhorando o desempenho da aplicação.
- **Memorização (Memoization):** Utiliza técnicas de memorização para garantir que as seleções sejam recalculadas apenas quando o estado relevante muda, otimizando o uso de recursos.
- **Integração Simples:** Fácil de integrar com o React Context existente, sem necessidade de reestruturar o código atual.
- **API Intuitiva:** Oferece uma API simples e intuitiva, facilitando a adoção e uso por desenvolvedores familiarizados com React e Redux.
- **Reutilizabilidade:** Promove a reutilização de lógica de seleção em diferentes partes da aplicação, mantendo o código DRY (Don't Repeat Yourself).

## Instalação

Para instalar o componente, você pode usar npm ou yarn:

```bash
npm install selector-provider
```

ou

```bash
yarn add selector-provider
```

## Uso

Aqui está um exemplo básico de como utilizar o Selector com React Context:

```jsx
import { createContextSelector, useContextSelector } from "selector-provider";

export const useSelector = (callback) => useContextSelector(Selector, callback);

// Contexto comum do React
export const Context = React.createContext({});

// Seletor é utilizado como um wrapper sobre o Contexto do React
export const Selector = createContextSelector(Context);

// Utilização natural
export const useContext = () => React.useContext(Context);

export const useCustomSelector = () => {
  // Usa-se o Selector ao invés de Context aqui
  return useContextSelector(Selector, (state) => state.service);
};

// Divirta-se!!

```

## Benefícios

- **Desempenho:** Melhora o desempenho ao minimizar re-renderizações desnecessárias.
- **Modularidade:** Facilita a manutenção e escalabilidade do código ao isolar a lógica de seleção.
- **Produtividade:** Acelera o desenvolvimento com uma API fácil de usar e integração direta com React Context.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias ou correções.
