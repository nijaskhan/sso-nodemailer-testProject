import React, { useEffect, useState } from 'react';
import { getUser } from '../api/apiCalls';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const handleGetUser = async (userId) => {
        try{
            const response = await getUser(userId);
            setUser(response.user);
        }catch(err){
            console.log(err.message);
            localStorage.removeItem('userId');
            navigate('/login');
        }
    }

    useEffect(() => {
        if(localStorage.getItem('userId')){
            const userId = JSON.parse(localStorage.getItem('userId'));
            handleGetUser(userId);
        }else{
            window.location.href = '/login';
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className='d-flex 100vh justify-content-center align-items-center'>
            <h1>Home page of {user?.name}</h1>
        </div>
    )
}

export default Home;
