import { useState } from "react";
import { Divider, Image } from "antd";
import { useAuth } from "../../../providers/AuthProvider";
import MyInformation from "./info";
import MyPosts from "./post";

const Profile = () => {
    const { isLoggedIn, user } = useAuth();
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: any) => {
        setActiveTab(index);
    };

    return (
        <div>
            {isLoggedIn ? (
                <div className="bg-violet-300">
                    <div className="py-1 px-3 lg:px-36">
                        <div className="border-2 border-indigo-700 p-1 rounded-lg">
                            <div className="bg-white p-5 rounded-lg">
                                <div className="flex justify-center">
                                    <div className="text-center">
                                        <Image preview={false} src={user?.avatar} width={'150px'} className="rounded-full" />
                                        <div className="font-bold text-xl">{user?.full_name}</div>
                                    </div>
                                </div>
                                <Divider />
                                <div className="bg-gray-100">
                                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                                        {/* Tabs */}
                                        <div className="border-b border-gray-200">
                                            <nav className="-mb-px flex" aria-label="Tabs">
                                                <a href="#" onClick={() => handleTabClick(0)} className={`group whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 0 ? 'text-gray-900 border-gray-500' : 'text-gray-500 hover:text-gray-900 hover:border-gray-500 focus:outline-none focus:text-gray-900 focus:border-gray-500'}`}>
                                                    <span className="flex items-center">
                                                        <span className="mr-2 font-bold">Thông tin cá nhân</span>
                                                    </span>
                                                </a>
                                                <a href="#" onClick={() => handleTabClick(1)} className={`group whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 1 ? 'text-gray-900 border-gray-500' : 'text-gray-500 hover:text-gray-900 hover:border-gray-500 focus:outline-none focus:text-gray-900 focus:border-gray-500'}`}>
                                                    <span className="flex items-center">
                                                        <span className="mr-2 font-bold">Bài viết của tôi</span>
                                                    </span>
                                                </a>
                                            </nav>
                                        </div>
                                        {/* Tab content */}
                                        <div className="bg-white shadow sm:rounded-lg">
                                            <div className={`${activeTab === 0 ? 'block' : 'hidden'} p-4`}><MyInformation user={user} /></div>
                                            <div className={`${activeTab === 1 ? 'block' : 'hidden'} p-4`}><MyPosts isLoggedIn={isLoggedIn} user={user} /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-violet-300">
                    <div className="py-1 px-3 lg:px-36">
                        <div className="border-2 border-indigo-700 p-1 rounded-lg">
                            <div className="bg-white p-5 rounded-lg">
                                Vui lòng đăng nhập để truy cập trang này
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
