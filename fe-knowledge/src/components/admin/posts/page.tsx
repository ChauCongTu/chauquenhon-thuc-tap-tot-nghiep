import { useEffect, useState } from "react";
import { getPosts } from "../../../modules/post/service/postService";
import { Post } from "../../../modules/post/type/postType";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import DeletePost from "../../post/delete";
import { Category } from "../../../modules/categories/types/type";
import { EyeOutlined } from "@ant-design/icons";

const PostManagement = () => {
    const [dataSource, setDataSource] = useState<any[]>([]);

    useEffect(() => {
        getPosts({ perPage: 1000 })
            .then((res) => {
                console.log(res.data.data);
                setDataSource(res.data.data);
            })
    }, []);
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
                    <DeletePost post_id={post.id} />
                </Space>
            ),
        },
    ]
    return (
        <div className="bg-violet-300">
            <div className="py-1 px-3 lg:px-36">
                <div className="border-2 border-indigo-700 p-1 rounded-lg">
                    <div className="bg-white p-5 rounded-lg">
                        <div className='border-b-2 border-indigo-700 font-bold text-3xl pb-3 mb-3'>Quản lý bài viết</div>
                        <div>
                            <div>
                                <Link to={'/post'} />
                            </div>
                            <Table dataSource={dataSource} columns={columns} pagination={{ hideOnSinglePage: true }} />
                            <div>
                                <Link to={'/admin'}>Quay lại</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostManagement