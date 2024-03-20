import { Button, Form, Input, Spin } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { emailValidationRules, passwordValidationRules } from "../../../../modules/auth/validation/rules";
import { LoginRequest, LoginResponse } from "../../../../modules/auth/type/type";
import { getLogin } from "../../../../modules/auth/service/service";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../../../../providers/AuthProvider";
import GoogleLogin from "../google";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const onFinish = (values: LoginRequest) => {
        setLoading(true);
        getLogin(values)
            .then((res: LoginResponse) => {
                console.log(res);
                if (res.success === true && res.token) {
                    login(res.token);
                    toast.success('Đăng nhập thành công')
                }
                else {
                    toast.error(res.message)
                }
            })
            .catch(() => toast.error('Có lỗi xảy ra'))
            .finally(() => setLoading(false))
    };
    return (
        <div>
            <Spin spinning={loading}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout={'vertical'}
                >
                    <Form.Item
                        name="email"
                        rules={emailValidationRules}
                        label="Địa chỉ Email:"
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên người dùng" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={passwordValidationRules}
                        label="Mật khẩu:"
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" className="block border hover:border-indigo-700 bg-indigo-700 text-center text-white hover:text-indigo-700 rounded-md p-1 w-full">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <div className="flex items-center mb-4">
                        <div className="flex-1 h-px bg-gray-400"></div>
                        <div className="mx-4 text-gray-600">OR</div>
                        <div className="flex-1 h-px bg-gray-400"></div>
                    </div>
                    <div className="flex justify-between">
                        <GoogleLogin />
                        <Link to={'/register'} className="text-gray-600 hover:text-indigo-700">
                            Tạo tài khoản mới
                        </Link>
                        <Link to={'#'} className="text-gray-600 hover:text-indigo-700">
                            Quên mật khẩu
                        </Link>
                    </div>
                </Form>
            </Spin>
        </div>
    )
}

export default LoginForm