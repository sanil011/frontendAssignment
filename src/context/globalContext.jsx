import React, { useState, useContext, createContext, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [alert, setAlert] = useState({
        flag: false,
        type: "",
        msg: "",
    });
    return (
        <AppContext.Provider
            value={{
                loading,
                setLoading,
                reload,
                setReload,
                alert,
                setAlert
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
};
export default AppProvider;