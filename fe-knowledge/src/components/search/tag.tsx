import { useEffect, useState } from "react"
import { Post } from "../../modules/post/type/postType"
import PostItem from "../post/postItem";
import { getSearch, getTagSearch } from "../../modules/post/service/postService";
import { Pagination } from "antd";
import PostItemSkeleton from "../post/postItem/skeleton";
import { useParams } from "react-router-dom";

const TagSearch = () => {
    const params = useParams();
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(1);
    const [result, setResult] = useState<Post[]>();
    const [loading, setLoading] = useState(false);
    if (!params.tags) return;
    useEffect(() => {
        setLoading(true);
        getTagSearch({ tags: params.tags, status: 'publish', perPage: 9 })
            .then((e) => {
                if (e.success) {
                    setTotal(e.data.total);
                    setCurrent(e.data.current_page)
                    setResult(e.data.data);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [params.tags]);
    const handleOnChange = (page: number) => {
        setLoading(true);
        getSearch({ tags: params.tags, status: 'publish', perPage: 9, page: page })
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
                            <div className="text-xl border-b-2 border-indigo-700 pb-3 mb-3 font-bold">Tags: #{params.tags} </div>
                            <div>
                                <div className="mt-5">
                                    {
                                        (result && result.length > 0) && <div>Có {total} bài viết được gắn tag #{params.tags}</div>
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

export default TagSearch