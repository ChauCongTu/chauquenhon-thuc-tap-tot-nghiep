import { useEffect, useState } from "react"
import { Post } from "../../../modules/post/type/postType";
import { getPosts } from "../../../modules/post/service/postService";
import PostItem from "../../post/postItem";

const LatestSection = () => {
    const [posts, setPosts] = useState<Post[] | null>([]);
    useEffect(() => {
        getPosts({ status: 'publish', perPage: 8 })
            .then((res) => {
                setPosts(res.data.data);
            })
    }, []);
    return (
        <div className="bg-violet-200">
            <div className="px-3 md:px-20 lg:px-40 py-10">
                <div className="text-3xl font-bold">Bài viết nổi bật</div>
                <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {
                        posts?.map((value) => {
                            return (
                                <div key={value.id}>
                                    <PostItem post={value} />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default LatestSection