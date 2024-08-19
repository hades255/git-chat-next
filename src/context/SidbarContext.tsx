import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the shape of the context state
interface SidebarContextProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

// Create the context with a default value (which will never be used)
const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

// Define the props for the provider component
interface SidebarContextProviderProps {
    children: ReactNode;
}

const SidebarContextProvider: React.FC<SidebarContextProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};

// Export the context and provider
export { SidebarContext, SidebarContextProvider };
