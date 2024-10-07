import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useQuestion from '../../hooks/useQuestion';


const User = () => {
    const { setCurrentQuestionIndex, setQuestions } = useQuestion();
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const navigateChoosenQusetion = async (param) => {

        try {
            // const response = await axios.get(`${USER_QUSETION_URL}/${auth.user}`);
            // setQuestions(response.data);
            setQuestions([]);
            setCurrentQuestionIndex(0);
            navigate(`/sorular/user-${auth?.user}`);
        } catch (err) {
            console.log(err);
        }

    }

    const handleLogout = async () => {
        console.log('logout');
        await logout();
        navigate('/', { replace: true });
    }


    return (
        <div>
            <h1>{auth.user}</h1>
            <button onClick={navigateChoosenQusetion}>Sorularim</button>
            <button onClick={handleLogout}>Çıkış Yap</button>
        </div>
    )
}

export default User
