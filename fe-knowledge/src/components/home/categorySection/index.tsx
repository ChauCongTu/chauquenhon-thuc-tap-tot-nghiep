import { useEffect, useState } from "react"
import { getCategoryThemes } from "../../../modules/categories/service/service";
import { Category } from "../../../modules/categories/types/type";
import PageLoading from "../../loading/loading";
import { FileOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import { Image } from "antd";

const CategorySection = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[] | null>([]);
    useEffect(() => {
        setLoading(true);
        getCategoryThemes()
            .then((res) => {
                setCategories(res.data);
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, []);
    // if (categories) {
    //     setLoading(false)
    // }
    return (
        <div>
            {
                categories && categories.map((value, index) => (
                    <div key={value.id}>
                        <div
                            className={`bg-gradient-to-tr ${index === 0 ? "from-[#2c3e50] to-[#706fd3]" : index === 1 ? "from-[#c0392b] to-[#ffda79]" : "from-[#9b59b6] to-[#2c2c54]"}`}>
                            <div className="px-3 lg:px-40">
                                <div className="flex items-center h-svh text-white">
                                    <div className="flex items-center">
                                        <div className="w-full lg:w-2/3">
                                            <div className="flex items-center">
                                                <div className="uppercase bg-indigo-700 shadow px-2 rounded-md text-sm">{value.name}</div>
                                                <div className="ml-3">
                                                    <FileOutlined /> {value.post_count} bài đọc
                                                </div>
                                            </div>
                                            <div className="text-4xl py-5 font-bold">{value.summary}</div>
                                            <div>
                                                {
                                                    value.posts.map((post, index) => (
                                                        <div key={post.id} className="my-3 text-lg">
                                                            <Link to={`${post.slug}`} className="text-white hover:text-white hover:border-l hover:pl-3">{++index}. {post.title}</Link>
                                                        </div>
                                                    ))
                                                }
                                                <div className="mt-10">
                                                    <Link to={`/danh-muc/${value?.slug}`} className="bg-indigo-700 text-white py-2 px-5 rounded-lg hover:bg-orange-700 hover:text-white transition-all hover:transition-all">Xem tất cả</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/3 justify-center hidden lg:flex">
                                            <Image src={value.posts[0]?.thumb} width={"100%"} className="border-2 shadow rounded-lg" preview={false} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            <PageLoading loading={loading} />
        </div>
    )
}

export default CategorySection