import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

function AppContextProvider({ children }) {

    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [notes, setNotes] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchUserData = async () => {
        const url = process.env.REACT_APP_BASE_URL + `/auth/getUserDetails`;
        const response = await fetch(url, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        const responseData = await response.json();

        if(responseData.success) {
            setUserData(responseData.data);
        } else {
            toast.error(responseData.message);
            console.log(responseData.message);
        }
    };

    const value = {
        loading,
        setLoading,
        isLoggedIn,
        setIsLoggedIn,
        userData, 
        setUserData,
        notes,
        setNotes,
        showEditModal,
        setShowEditModal,
        fetchUserData,
    }
    

    return <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider>
}

export default AppContextProvider;