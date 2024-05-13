import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import useRefresh from '../hooks/useRefresh';
import { Outlet } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';
import Loading from '../components/Loading';

const PersistLogin = () => {
    console.log("Persist Login");
    const refresh = useRefresh();
    const [isLoading, setIsLoading] = useState(true);
    const persist = true;

    useEffect(() => {

        const handleRefresh = async () => {
            try {
                await refresh();
            } catch(err) {
                console.log(err);
            } finally {
                setIsLoading(false)
            }
        };

        persist ? handleRefresh() : setIsLoading(false);

        return () => { console.log("Persist Cleaned"); }

    },[]);

    return isLoading ? <Loading />
           : <Outlet />
}

export default PersistLogin
