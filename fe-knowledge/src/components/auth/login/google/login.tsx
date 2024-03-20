import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCallBack } from "../../../../modules/auth/service/service";
import { useAuth } from "../../../../providers/AuthProvider";

const GoogleCallback = () => {
    const { login } = useAuth();
    const location = useLocation();
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    const navigate = useNavigate();

    if (!hasBeenCalled) {
        // Lấy query params từ URL
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");
        const scope = queryParams.get("scope");
        const authuser = queryParams.get("authuser");
        const prompt = queryParams.get("prompt");

        // Gửi request API với các tham số đã lấy được
        if (code && scope && authuser && prompt) {
            console.log("gỌI 1 LẦN")
            getCallBack({ code: code, scope: scope, authuser: authuser, prompt: prompt })
                .then((res: any) => {
                    console.log(res)
                    if (res.success === true) {
                        login(res.token);
                    }
                })
                .catch(() => console.log('^^'))
                .finally(() => navigate("/"))
        }
        setHasBeenCalled(true);
    }

    return (
        <div>
            <div className="h-[100vh]"></div>
        </div>
    )
}

export default GoogleCallback
