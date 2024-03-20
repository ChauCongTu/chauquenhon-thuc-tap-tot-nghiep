import { useEffect, useState } from "react"
import { Post } from "../../modules/post/type/postType"
import PostItem from "../post/postItem";
import { getSearch } from "../../modules/post/service/postService";
import { Pagination } from "antd";
import PostItemSkeleton from "../post/postItem/skeleton";

const TitleSearch = () => {
    const [key, setKey] = useState('');
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(1);
    const [result, setResult] = useState<Post[]>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getSearch({ keyword: key, status: 'publish', perPage: 9 })
            .then((e) => {
                if (e.success) {
                    setTotal(e.data.total);
                    setCurrent(e.data.current_page)
                    setResult(e.data.data);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [key]);
    const handleOnChange = (page: number) => {
        setLoading(true);
        getSearch({ keyword: key, status: 'publish', perPage: 9, page: page })
            .then((e) => {
                if (e.success) {
                    setTotal(e.data.total);
                    setCurrent(e.data.current_page)
                    setResult(e.data.data);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }
    return (
        <div>
            <div className="bg-violet-300">
                <div className="py-1 px-3 lg:px-36">
                    <div className="border-2 border-indigo-700 p-1 rounded-lg">
                        <div className="bg-white p-5 rounded-lg">
                            <div className="text-xl border-b-2 border-indigo-700 pb-3 mb-3 font-bold">Tìm kiếm bài viết</div>
                            <div>
                                <div>
                                    <input
                                        type="text"
                                        value={key}
                                        onChange={(e) => setKey(e.target.value)}
                                        placeholder="Nhập từ khóa"
                                        className="w-full h-10 pl-3 border rounded-md bg-slate-50 focus:ring-2 focus:ring-indigo-700"
                                    />
                                </div>
                                <div className="mt-5">
                                    {
                                        (result && result.length > 0) && <div>Tìm thấy {total} kết quả</div>
                                    }
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                                        {
                                            loading && <>
                                                <PostItemSkeleton />
                                                <PostItemSkeleton />
                                                <PostItemSkeleton />
                                            </>
                                        }
                                        {
                                            result?.map((e) => (
                                                <div key={e.id} className="border rounded-lg">
                                                    <PostItem post={e} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div>
                                        <Pagination current={current} total={total} pageSize={9} hideOnSinglePage onChange={handleOnChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TitleSearch