import React, { createContext, ReactNode, useContext, useState } from "react";

interface HeaderContextType {
  isVisible: boolean;
  showHeader: () => void;
  hideHeader: () => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  /* console.log("Контекст:", context); */
  if (!context) {
    throw new Error("Бла");
  }
  return context;
};

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const showHeader = () => setIsVisible(true);
  const hideHeader = () => setIsVisible(false);

  return (
    <HeaderContext.Provider value={{ isVisible, showHeader, hideHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};
