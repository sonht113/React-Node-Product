import React, { useState } from "react";
import LoaderActionApi from "../components/loader/Loader";

export const OverlayLoadingContext = React.createContext({
  setLoading: (v: boolean) => {},
  loading: false,
});

interface LoadingContextProps {
  children: any;
}
const LoadingContext: React.FC<LoadingContextProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <OverlayLoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <LoaderActionApi />}
      {children}
    </OverlayLoadingContext.Provider>
  );
};

export default LoadingContext;
