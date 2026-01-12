import React, { useState } from 'react';
import { Input, Button, Form, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { URL_SIGNIN } from '../utils/Endpoint';
import { useLocation, useNavigate } from 'react-router-dom';

const AUTH_STORAGE_KEY = 'auth';

function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = (values) => {
        setErrMsg('');
        setLoading(true);
        const data = {
            email: values.email.trim().toLowerCase(),
            password: values.password,
        };

        axios
            .post(URL_SIGNIN, data)
            .then((res) => {
                const role = res?.data?.role;
                if (role !== 'Admin') {
                    setErrMsg('Hanya admin yang dapat mengakses halaman ini');
                } else {
                    const authPayload = {
                        token: res?.data?.token,
                        role: res?.data?.role,
                        user: {
                            _id: res?.data?._id,
                            name: res?.data?.name,
                            email: res?.data?.email,
                        },
                    };
                    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authPayload));
                    navigate(from, { replace: true });
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err?.message || 'Login gagal';
                setErrMsg(message);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <>
            {errMsg !== "" && (
                <div className="px-4 sm:px-0" style={{ paddingTop: 20 }}>
                    <Alert message={errMsg} type='error' />
                </div>
            )}

            <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
                <div className='bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full max-w-sm sm:max-w-md'>
                    <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center'>Login</h2>
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        autoComplete='off'
                        layout='vertical'
                    >
                        <Form.Item
                            label='Email'
                            name='email'
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder='email'
                                size='large'
                                className='rounded-md'
                            />
                        </Form.Item>

                        <Form.Item
                            label='Password'
                            name='password'
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder='password'
                                size='large'
                                className='rounded-md'
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                block
                                loading={loading}
                                size='large'
                                className='text-sm sm:text-base'
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Login;

// *********************KODE ASLI DIBAWAH INI**************************************
// import React, { useState } from 'react';
// import { Input, Button, Form, Alert } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { URL_SIGNIN } from '../utils/Endpoint';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const [form] = Form.useForm();
//     const [loading, setLoading] = useState(false);
//     const [errMsg, setErrMsg] = useState('');

//     const navigate = useNavigate();

//     const handleSubmit = (values) => {
//         setLoading(true);
//         const data = {
//             email: values.email.trim().toLowerCase(),
//             password: values.password,
//         };

//         axios
//             .post(URL_SIGNIN, data)
//             .then((res) => {
//                 console.log('res', res);
//                 if (res.data.role !== 'Admin') {
//                     setErrMsg('Hanya admin yang dapat mengakses halaman ini');
//                 } else {
//                     navigate("/dashboard");
//                 }
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 setErrMsg(err.response.data.message);
//                 setLoading(false);
//             });
//     };

//     return (
//         <>
//             {errMsg !== "" && (
//                 <div style={{ padding: '20px' }}>
//                     <Alert message={errMsg} type='error' />
//                 </div>
//             )}

//             <div className='flex items-center justify-center min-h-screen bg-gray-100'>
//                 <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
//                     <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
//                     <Form
//                         form={form}
//                         onFinish={handleSubmit}
//                         autoComplete='off'
//                         layout='vertical'
//                     >
//                         <Form.Item
//                             label='Email'
//                             name='email'
//                             rules={[{ required: true, message: 'Please input your email!' }]}>
//                             <Input 
//                                 prefix={<UserOutlined />}
//                                 placeholder='email'
//                                 size='large'
//                             />
//                         </Form.Item>

//                         <Form.Item
//                             label='Password'
//                             name='password'
//                             rules={[{ required: true, message: 'Please input your password!' }]}>
//                             <Input.Password 
//                                 prefix={<LockOutlined />}
//                                 placeholder='password'
//                                 size='large'
//                             />
//                         </Form.Item>

//                         <Form.Item>
//                             <Button
//                                 type='primary'
//                                 htmlType='submit'
//                                 block
//                                 loading={loading}
//                                 size='large'>
//                                 Login
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Login;