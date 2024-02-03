import { PropsWithChildren, createContext, useContext, useState } from "react";
import { BasketType } from "../types/BasketType";

interface StoreContextValue {
  removeItem: (productId: number, quantity: number) => void;
  setBasket: (basket: BasketType) => void;
  basket: BasketType | null;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext() {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw Error("no access to context");
  }

  return context;
}

export function StoreProvider({ children }: PropsWithChildren<unknown>) {
  const [basket, setBasket] = useState<BasketType | null>(null);

  function removeItem(productId: number, quantity: number) {
    if (!basket) return;

    const item = basket.items.find((product) => product.productId === productId);

    if (basket.id && item?.productId) {
      const updateItems = basket.items.filter((product) => product.productId !== productId);

      setBasket((prevState) => {
        return {
          ...prevState!,
          items: updateItems,
        };
      });
    }
  }
  return <StoreContext.Provider value={{ basket, setBasket, removeItem }}>{children}</StoreContext.Provider>;
}
