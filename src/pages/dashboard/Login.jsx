import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form] = form.useForm();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrmsg] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (values) => {
        setLoading(true);
        const data = {
            email: values.email,
            password: values.password,
        };
        axios
            .post(URL_SIGIN, data)
            .then((res) => {
                console.log("res", res);
                if (res.data.role !== "admin") {
                    setErrmsg("Anda bukan admin")
                } else {
                    navigate("/dashboard");
                }
                serLoading(false);
            })
            .catch((err) => {
                setErrmsg(err.response.data.message || "Login gagal");
                setLoading(false); 
            });
    };

    return (
        <>
            {errMsg !== "" && (
                <div style={{ padding: '20px'}}>
                    <Alert message={errMsg} type='error' />
                </div>
            )}
            <div className='flex items-center justify-center min-h-screen bg-gray-100'>
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form
                        form={form}
                        onFinish={handleSubmit}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <form.Item 
                            label='Email'
                            name='email'
                            rules={[{ required: true, meessage: "please input your email!"}]}>
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Email"
                                    size="large"
                                    autoComplete='off'
                                />
                        </form.Item>

                        <form.Item
                            label='Password'
                            name='password'
                            rules={[{ required: true, message: "Please input your password!"}]}>
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Password"
                                    size="large"
                                    autoComplete='off'
                                />
                        </form.Item>

                        <form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                                loading={loading}
                            >
                                Login
                            </Button>
                        </form.Item>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;