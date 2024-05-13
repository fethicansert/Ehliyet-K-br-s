import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { jwtDecode } from 'jwt-decode'
import useRefresh from '../hooks/useRefresh';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const RequireAuth = () => {

    const { auth } = useAuth();
    const location = useLocation();
   

    return auth.user ? <Outlet />
            : <Navigate to={'/giris-yap'} replace state={{ from: location }} />


}

export default RequireAuth
