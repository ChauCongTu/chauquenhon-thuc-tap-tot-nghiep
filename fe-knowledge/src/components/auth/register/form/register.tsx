import { useState } from "react";
import { getRegister } from "../../../../modules/auth/service/service";
import { useAuth } from "../../../../providers/AuthProvider";
import { LoginResponse, RegisterRequest } from "../../../../modules/auth/type/type";
import toast from "react-hot-toast";
import { Button, Form, Input, Spin } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { emailValidationRules, fullNameRule, passwordConfirmationRules, passwordValidationRules, userNameRules } from "../../../../modules/auth/validation/rules";
import GoogleLogin from "../../login/google";
import { Link } from "react-router-dom";

const RegisteForm = () => {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<any>([]);
    const onFinish = (values: RegisterRequest) => {
        setLoading(true);
        getRegister(values)
            .then((res: LoginResponse) => {
                console.log(res);
                if (res.success === true && res.token) {
                    login(res.token);
                    toast.success('Đăng ký thành công')
                }
                else {
                    console.log(res);
                    setMessage(res.message);
                }
            })
            .catch(() => toast.error('Có lỗi xảy ra'))
            .finally(() => setLoading(false))
    };
    return (
        <div>
            <Spin spinning={loading}>
                <Form
                    name="normal_register"
                    className="register-form"
                    onFinish={onFinish}
                    layout={'vertical'}
                >
                    <Form.Item
                        name="username"
                        rules={userNameRules}
                        label="Tên người dùng:"
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên người dùng" />
                    </Form.Item>
                    <div className="mt-[-15px] text-red-700">
                        {message.username}
                    </div>
                    <Form.Item
                        name="email"
                        rules={emailValidationRules}
                        label="Địa chỉ Email:"
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Địa chỉ email" />
                    </Form.Item>
                    <div className="mt-[-15px] text-red-700">
                        {message.email}
                    </div>
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
                    <div className="mt-[-15px]">
                        {message.password}
                    </div>
                    <Form.Item
                        name="password_confirmation"
                        rules={passwordConfirmationRules}
                        label="Nhập lại mật khẩu:"
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                        />
                    </Form.Item>
                    <div className="mt-[-15px] text-red-700">
                        {message.password_confirmation}
                    </div>
                    <Form.Item
                        name="full_name"
                        rules={fullNameRule}
                        label="Họ tên:"
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Họ tên" />
                    </Form.Item>
                    <div className="mt-[-15px] text-red-700">
                        {message.full_name}
                    </div>
                    <Form.Item>
                        <Button htmlType="submit" className="block border hover:border-indigo-700 bg-indigo-700 text-center text-white hover:text-indigo-700 rounded-md p-1 w-full">
                            Tạo tài khoản mới
                        </Button>
                    </Form.Item>
                    <div className="flex items-center mb-4">
                        <div className="flex-1 h-px bg-gray-400"></div>
                        <div className="mx-4 text-gray-600">OR</div>
                        <div className="flex-1 h-px bg-gray-400"></div>
                    </div>
                    <div className="flex justify-between">
                        <GoogleLogin />
                        <Link to={'/login'} className="text-gray-600 hover:text-indigo-700">
                            Đăng nhập
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

export default RegisteForm