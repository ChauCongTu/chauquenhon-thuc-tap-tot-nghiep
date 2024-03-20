import React from "react";
import { Post } from "../../../modules/post/type/postType";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import { formatTime, strToTime } from "../../../utils/time";

type Props = {
    post: Post;
    index: number;
};

const VerticalItem: React.FC<Props> = ({ post, index }) => {
    const time = strToTime(post.published_at);
    return (
        <div className="rounded-lg border-t border-b border-indigo-700 w-full bg-white p-4 mb-4">
            <div className="flex items-start">
                <div className="text-5xl text-orange-500 font-bold mr-2">{++index}</div>
                <div>
                    <h2 className="mb-2"><Link className="text-gray-900 hover:text-indigo-700 hover:underline" to={`/${post.slug}`}>{post.title}</Link></h2>
                    <p className="text-gray-700 text-sm mb-2 flex items-center"><Avatar src={post.author.avatar} size={'small'} /> <p className="ml-3"> Written by {post.author.full_name}</p></p>
                    <div className="flex justify-end">
                        <div className="text-sm text-gray-700">{formatTime(time)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerticalItem;
