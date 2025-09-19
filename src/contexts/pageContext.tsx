import { createContext, useContext, useState, useCallback, useMemo, Children } from 'react';

type PageContextType = {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export function usePageContext() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePageContext must be used within a PageContextProvider');
  }
  return context;
}

type PageContextProviderProps = {
  children: React.ReactNode;
};

export function PageContextProvider({ children }: PageContextProviderProps) {
  console.log('PageContextProvider');
  const [isLoading, setIsLoading] = useState(false);
  const showLoading = useCallback(() => setIsLoading(true), []);
  const hideLoading = useCallback(() => setIsLoading(false), []);
  const value = useMemo<PageContextType>(() => {
    return {
      isLoading,
      showLoading,
      hideLoading
    };
  }, [isLoading, showLoading, hideLoading]);
  return (
    <PageContext.Provider value={value}>
      {children}
      {isLoading && <div className="loading">Loading...</div>}
    </PageContext.Provider>
  );
}
