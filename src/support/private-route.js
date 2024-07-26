import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { tokenVerificationApi } from "../api/token-verification-api";

const PrivateRoute = () => {
    
    const [loading, setLoading] = useState(true); // Introduce loading state
    const [user, setUser] = useState(false);

    useEffect(() => {
        
        const verifyUser = async () => {
            try {
                const token = await tokenVerificationApi();

                if (token.message === 'Verified') {
                    setUser(true);
                    setLoading(false)

                } else {

                    setUser(false);
                    setLoading(false);
                    return <Navigate to='/login' />
                    
                }
                
            } catch (error) {

                console.error('Error while validating user:', error);
                setUser(false);
                
                setLoading(false)
                // Remove any previously stored token
                localStorage.removeItem('token');
                <Navigate to='/login' />

            } 
        };

        verifyUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Render loading state while verifying user
    }

    return user ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute;
