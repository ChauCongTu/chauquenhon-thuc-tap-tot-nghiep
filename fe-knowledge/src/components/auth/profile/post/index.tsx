import React, { useEffect, useState } from "react";
import { User } from "../../../../modules/users/types/type";
import { getMyPost, getMyPublishPost, getMySchedulePost } from "../../../../modules/auth/service/service";
import { Post } from "../../../../modules/post/type/postType";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { Category } from "../../../../modules/categories/types/type";
import PageLoading from "../../../loading/loading";
import DeletePost from "../../../post/delete";

interface Props {
    isLoggedIn: boolean;
    user: User | null;
}

const MyPosts: React.FC<Props> = ({ isLoggedIn, user }) => {
    const [loading, setLoading] = useState(false);
    const [posts, setPost] = useState<Post[]>([]);
    const [activeTab, setActiveTab] = useState(2);

    const handleTabClick = (index: any) => {
        setActiveTab(index);
    };
    useEffect(() => {
        setLoading(true);
        if (activeTab === 2) {
            getMyPost().then((res) => setPost(res.data.data)).finally(() => setLoading(false));
        }
        else if (activeTab === 0) {
            getMyPublishPost().then((res) => setPost(res.data.data)).finally(() => setLoading(false));
        }
        else {
            getMySchedulePost().then((res) => setPost(res.data.data)).finally(() => setLoading(false));
        }
    }, [activeTab])
    if (!isLoggedIn) {
        return <div>Bạn cần đăng nhập để xem bài viết của mình</div>;
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Thumb',
            dataIndex: 'thumb',
            key: 'thumb',
            render: (thumb: string) => <img src={thumb} alt="Thumbnail" style={{ width: 50 }} />,
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            render: (category: Category) => <>{category.name}</>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Ngày Publish',
            dataIndex: 'published_at',
            key: 'published_at',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (post: Post) => (
                <Space size="middle">
                    <Link to={`/${post.slug}`}>
                        <EyeOutlined />
                    </Link>
                    <Link to={`/${post.slug}/edit`}>
                        <EditOutlined />
                    </Link>
                    <DeletePost post_id={post.id} />
                </Space>
            ),
        },
    ];
    return (
        <div>
            {user && (
                <div>
                    <div className="z-[99999999]">
                        <PageLoading loading={loading} />
                    </div>
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex" aria-label="Tabs">
                            <div onClick={() => handleTabClick(2)} className={`group cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 1 ? 'text-gray-900 border-gray-500' : 'text-gray-500 hover:text-gray-900 hover:border-gray-500 focus:outline-none focus:text-gray-900 focus:border-gray-500'}`}>
                                <span className="flex items-center border-r-2">
                                    <span className="mr-2">Tất cả bài viết</span>
                                </span>
                            </div>
                            <div onClick={() => handleTabClick(0)} className={`group cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 0 ? 'text-gray-900 border-gray-500' : 'text-gray-500 hover:text-gray-900 hover:border-gray-500 focus:outline-none focus:text-gray-900 focus:border-gray-500'}`}>
                                <span className="flex items-center border-r-2">
                                    <span className="mr-2">Bài viết đã xuất bản</span>
                                </span>
                            </div>
                            <div onClick={() => handleTabClick(1)} className={`group cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 1 ? 'text-gray-900 border-gray-500' : 'text-gray-500 hover:text-gray-900 hover:border-gray-500 focus:outline-none focus:text-gray-900 focus:border-gray-500'}`}>
                                <span className="flex items-center">
                                    <span className="mr-2">Bài viết đang lên lịch</span>
                                </span>
                            </div>
                        </nav>
                    </div>
                    {/* Tab content */}
                    <div className="bg-white shadow sm:rounded-lg">
                        <Table columns={columns} dataSource={posts} pagination={{ hideOnSinglePage: true }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPosts;
