import React, { useState } from "react";

export const ContextProduct = React.createContext({
  setIsShowAlert: (value: boolean) => {},
  setAction: (value: string) => {},
  action: "",
  isShowAlert: false,
});

interface ProductContextProps {
  children: any;
}
const ProductContext: React.FC<ProductContextProps> = ({ children }) => {
  const [action, setAction] = useState<string>("");
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  return (
    <ContextProduct.Provider
      value={{ action, isShowAlert, setIsShowAlert, setAction }}
    >
      {children}
    </ContextProduct.Provider>
  );
};

export default ProductContext;
