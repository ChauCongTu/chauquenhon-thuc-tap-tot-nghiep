import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getGoogleSigninUrl } from "../../../../modules/auth/service/service";

const GoogleLogin = () => {
    const [url, setUrl] = useState("");
    useEffect(() => {
        getGoogleSigninUrl()
            .then((res) => setUrl(res.url))
    }, []);
    return (
        <div>
            <Link to={url} className="text-gray-600 hover:text-indigo-700 cursor-pointer">
                Sign in with Google
            </Link>
        </div>
    )
}

export default GoogleLogin