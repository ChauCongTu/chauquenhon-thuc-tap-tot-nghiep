import { UserOutlined, CommentOutlined, EyeOutlined, FileTextOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getStatistics } from '../../../modules/statistic/service/service';

const StatisticSection = () => {
    const [post, setPost] = useState(0);
    const [user, setUser] = useState(0);
    const [comment, setComment] = useState(0);
    const [view, setView] = useState(0);
    useEffect(() => {
        getStatistics().then((res) => {
            setPost(res.data.post_count);
            setUser(res.data.user_count);
            setComment(res.data.comment_count);
            setView(res.data.view_count);
        })
    }, []);
    return (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold tracking-wider text-white uppercase">Thống kê số liệu</h2>
                </div>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="flex items-center justify-center bg-white rounded-lg p-8 shadow-xl hover:shadow-2xl transform transition-transform hover:scale-105">
                        <UserOutlined className="text-5xl text-purple-500" />
                        <div className="ml-6">
                            <p className="text-lg font-semibold text-gray-900">Số người dùng</p>
                            <p className="mt-2 text-base text-gray-700">{user}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-white rounded-lg p-8 shadow-xl hover:shadow-2xl transform transition-transform hover:scale-105">
                        <FileTextOutlined className="text-5xl text-yellow-500" />
                        <div className="ml-6">
                            <p className="text-lg font-semibold text-gray-900">Số bài viết</p>
                            <p className="mt-2 text-base text-gray-700">{post}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-white rounded-lg p-8 shadow-xl hover:shadow-2xl transform transition-transform hover:scale-105">
                        <CommentOutlined className="text-5xl text-blue-500" />
                        <div className="ml-6">
                            <p className="text-lg font-semibold text-gray-900">Số bình luận</p>
                            <p className="mt-2 text-base text-gray-700">{comment}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-white rounded-lg p-8 shadow-xl hover:shadow-2xl transform transition-transform hover:scale-105">
                        <EyeOutlined className="text-5xl text-red-500" />
                        <div className="ml-6">
                            <p className="text-lg font-semibold text-gray-900">Tổng lượt đọc</p>
                            <p className="mt-2 text-base text-gray-700">{view}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticSection;
