import React, { useEffect, useRef, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import { Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { googleAuthLogin, loginUser } from '../api/apiCalls';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [verifyPopup, setverifyPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const loginbtn = useRef(null);

    const googleLogin = useGoogleLogin({
        onSuccess: async (CredentialResponse) => {
            const access_token = CredentialResponse.access_token
            try {
                const googleResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });
                if (googleResponse.data) {
                    const response = await googleAuthLogin(googleResponse.data);
                    if (response.success) {
                        console.log("login successful");
                        localStorage.setItem("userId", JSON.stringify(response?.user?._id));
                        navigate('/');
                    } else {
                        toast.error(response.message);
                    }
                } else {
                    console.log("login failed");
                }
            } catch (err) {
                toast.error(err.message);
            }
        }
    });

    useEffect(() => {
        if (localStorage.getItem('userId')) navigate('/');
        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        // eslint-disable-next-line
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        const response = await loginUser(data);
        setLoading(false);
        if (response?.success) {
            if (response.verified) {
                console.log("login successful");
                localStorage.setItem("userId", JSON.stringify(response.user._id));
                navigate('/');
            } else {
                localStorage.setItem("userId", JSON.stringify(response.user._id));
                toast.info(response.message);
                setverifyPopup(true);
            };
        } else {
            toast.error(response.message);
        }
    }

    return (
        <>
            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12' >
                        <MDBCard className='bg-white my-4 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                            <MDBCardBody className='p-5 w-100 d-flex flex-column' style={{ backgroundColor: '#cccccc', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5), 0 10px 40px rgba(0, 0, 0, 0.1)' }}>
                                <h2 className="fw-bold mb-3 text-center">Sign in</h2>
                                <p className="text-muted-50 mb-3">Please enter your login and password!</p>

                                <MDBInput wrapperClass='mb-4 w-100' label='Email address' placeholder='Email'
                                    {...register("email", { required: true })} type='email' size="lg" />
                                <MDBInput wrapperClass='mb-4 w-100' label='Password'
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            loginbtn.current.click();
                                        };
                                    }} placeholder='Password'
                                    {...register("password", { required: true })} type='password' size="lg" />

                                <MDBCheckbox name='flexCheck' className='mb-4' label='Remember password' />
                                {
                                    loading ? (
                                        <Button variant="primary" disabled size='lg'>
                                            <Spinner
                                                as="span"
                                                variant="light"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                animation="border" />
                                            Loading...
                                        </Button>
                                    ) : (
                                        <MDBBtn size='lg' ref={loginbtn} onClick={handleSubmit(onSubmit)}>
                                            Login
                                        </MDBBtn>
                                    )
                                }
                                {
                                    verifyPopup &&
                                    <MDBBtn className="mb-2 mt-3 w-100 text-dark fw-bold fs-6" size="lg" style={{ backgroundColor: '#b3ffb3' }}>
                                        <MDBIcon fab icon="google" className="mx-2" />
                                        verification email sent to your mail
                                    </MDBBtn>
                                }
                                <hr className="my-4" />
                                <MDBBtn className="mb-3 w-100" size="lg" style={{ backgroundColor: 'blueviolet' }}
                                    onClick={() => googleLogin()}
                                >
                                    <MDBIcon fab icon="google" className="mx-2" />
                                    Sign in with Google
                                </MDBBtn>
                                <MDBBtn className="mb-3 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
                                    <MDBIcon fab icon="facebook-f" className="mx-2" />
                                    Sign in with facebook
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Login
