import { useEffect, useState } from "react"
import { Post } from "../../modules/post/type/postType";
import { getPosts } from "../../modules/post/service/postService";
import VerticalItem from "../post/verticalItem";
import { LikeOutlined } from '@ant-design/icons';

const MostLiked = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        getPosts({ perPage: 8, status: 'publish', orderBy: 'like_count' })
            .then((res) => {
                setPosts(res.data.data)
            })
    }, []);
    return (
        <div>
            <div className="border-4 rounded-lg border-indigo-700 p-2">
                <div className="text-2xl mb-5 text-indigo-700 font-bold"><LikeOutlined /> MOST LIKED</div>
                <div>
                    {
                        posts.map((e, i) => (
                            <div key={e.id}><VerticalItem index={i} post={e} /></div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MostLiked