import React from 'react'
import axios from '../api/axios'
import { jwtDecode } from 'jwt-decode';
import useAuth from './useAuth';
const REFRESH_URL = '/refresh';

const useRefresh = () => {
    const {setAuth}  = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get(REFRESH_URL, { withCredentials: true });
            const accessToken = response?.data?.accessToken;
            console.log(accessToken);
            if (accessToken) {
                const decoded = jwtDecode(accessToken);
                const user = decoded.UserInfo.username;
                const roles = decoded.UserInfo.roles;
                setAuth({ user, roles });
            };
            return accessToken;
        } catch (err) {
            // console.log(err);
        }
    }
    return refresh;
}

export default useRefresh
