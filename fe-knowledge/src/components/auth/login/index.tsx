import { Image, Spin } from "antd"
import LoginForm from "./form/login"
import { useAuth } from "../../../providers/AuthProvider"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { isLoggedIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);
    if (isLoggedIn) {
        navigate("/");
    }
    return (
        <Spin spinning={loading}>
            <div className="px-3 md:px-20 lg:px-40 p-1 bg-white mt-1">
                <div>
                    <div className="h-svn w-full ">
                        <div className="flex items-center justify-between flex-wrap pb-10">
                            <div className="w-full lg:w-1/2 text-center hidden lg:block">
                                <Image width={'70%'} src="/logo.png" alt="TGL Logo" preview={false} />
                            </div>
                            <div className="w-full lg:w-1/2 flex justify-center">
                                <div className="w-[70%]">
                                    <div className="text-center text-2xl my-5 font-bold">ĐĂNG NHẬP</div>
                                    <LoginForm />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default Login