import React from 'react'
import axios from '../api/axios';
import useAuth from './useAuth';

const LOGOUT_URL = 'logout';

const useLogout = () => {
    const { setAuth } = useAuth();

    const handleLogout = async () => {

        try {
            const response = await axios.post(LOGOUT_URL, {}, {
                withCredentials: true
            });
            console.log(response);
            setAuth({});
        } catch (err) {
            console.log(err);
        }
    }

    return handleLogout;
}

export default useLogout
