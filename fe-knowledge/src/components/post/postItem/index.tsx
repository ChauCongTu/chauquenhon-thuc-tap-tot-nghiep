import React from "react";
import { Post } from "../../../modules/post/type/postType";
import { HeartOutlined, CommentOutlined } from '@ant-design/icons'; // Import các icon từ Ant Design
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import { formatTime, strToTime } from "../../../utils/time";

type Props = {
    post: Post;
};

const PostItem: React.FC<Props> = ({ post }) => {
    const time = strToTime(post.published_at);
    const imageStyle = {
        backgroundImage: `url(${post.thumb})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '200px',
        marginBottom: '10px',
    };

    return (
        <div className="rounded-lg w-full hover:shadow-md bg-white p-4 mb-4">
            <p className="text-gray-700 text-sm mb-2 flex items-center"><Avatar src={post.author.avatar} size={'small'} /> <p className="ml-3"> Written by {post.author.full_name}</p></p>
            <div className="border-t border-b border-indigo-700" style={imageStyle}></div>
            <h2 className="text-xl font-semibold mb-2 line-clamp-1"><Link className="text-gray-900 hover:text-indigo-700 hover:underline" to={`/${post.slug}`}>{post.title}</Link></h2>
            <div className="flex justify-between">
                <div className="text-sm text-gray-700">{formatTime(time)}</div>
                <div className="flex items-center justify-end">
                    <div className="flex items-center mr-1">
                        <HeartOutlined className="text-red-500 mr-1" />
                        <span className="text-gray-500">{post.likes.length}</span>
                    </div>
                    <div className="flex items-center ml-1">
                        <CommentOutlined className="text-blue-500 mr-1" />
                        <span className="text-gray-500">{post.comments.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
