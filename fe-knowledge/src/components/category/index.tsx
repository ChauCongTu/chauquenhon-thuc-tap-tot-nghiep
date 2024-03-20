import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getCategoryPosts } from "../../modules/categories/service/service";
import { Post } from "../../modules/post/type/postType";
import PageNotFound from "../error";
import PostItem from "../post/postItem";
import PageLoading from "../loading/loading";
import { Pagination } from "antd";
import MostLiked from "../rightNav";

const Category = () => {
    const params = useParams();
    const [category, setCategory] = useState<any>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setLoading(true);
        getCategoryPosts(params.slug ? params.slug : '', { perPage: 8 })
            .then((res) => {
                console.log(res)
                if (res.success) {
                    console.log(res.data);
                    setTotal(res.data.total);
                    setCurrent(res.data.current_page)
                    setCategory(res.category);
                    setPosts(res.data.data);
                }
            })
            .catch(() => { console.log('Error') })
            .finally(() => setLoading(false))
    }, [params.slug]);
    if (posts.length == 0) {
        return <PageNotFound />
    }
    const handleChange = (page: number) => {
        setLoading(true);
        getCategoryPosts(params.slug ? params.slug : '', { perPage: 8, page: page })
            .then((res) => {
                console.log(res)
                if (res.success) {
                    console.log(res.data);
                    setTotal(res.data.total);
                    setCurrent(res.data.current_page)
                    setCategory(res.category);
                    setPosts(res.data.data);
                }
            })
            .catch(() => { console.log('Error') })
            .finally(() => {
                setLoading(false);
                scrollToTitle();
            })
    }
    const scrollToTitle = () => {
        const titleElement = document.getElementById("title");
        if (titleElement) {
            titleElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="bg-violet-300">
            <div className="py-1 px-3 lg:px-36">
                <div className="border-2 border-indigo-700 p-1 rounded-lg">
                    <div className="bg-white p-5 rounded-lg">
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-2/3">
                                <div className="mr-5">
                                    <div className="text-2xl font-bold text-indigo-700" id="title">{category.name}</div>
                                    <div className="border-b-2 border-indigo-700 pb-3 text-gray-600">{category.summary}</div>
                                    <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mt-5">
                                        {
                                            posts.map((value) => (
                                                <div key={value.id}>
                                                    <PostItem post={value} data-aos="fade-up" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="my-5">
                                        <div className="flex justify-end">
                                            <Pagination current={current} total={total} pageSize={8} onChange={handleChange} hideOnSinglePage responsive data-aos="fade-up" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/3">
                                <MostLiked />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PageLoading loading={loading} />
        </div>
    )
}

export default Category