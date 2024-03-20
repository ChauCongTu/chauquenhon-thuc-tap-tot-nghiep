import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { EditOutlined } from "@ant-design/icons";
import { Category } from "../../../modules/categories/types/type";
import { getCategories } from "../../../modules/categories/service/service";
import AddTag from "./tag";
import MDXEditor from "./MDX/editor";
import { getLoadDraft, getSaveDraft } from "../../../modules/post/service/postService";
import toast from "react-hot-toast";
import SchedulePost from "./schedule";
import PublishButton from "./publish";
import html2md from "html-to-md";

const WritePost = () => {
    const [loading, setLoading] = useState(false);
    const [mdContent, setMdContent] = useState('');
    const { isLoggedIn } = useAuth();
    const [categories, setCateries] = useState<Category[]>([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [tags, setTags] = useState<any>([]);
    const [publishedAt, setPublishedAt] = useState(null);
    const [status, setStatus] = useState('publish');

    useEffect(() => {
        getCategories()
            .then((res) => {
                setCateries(res.data.data);
            })
    }, []);
    if (!isLoggedIn) {
        return <div className="">Vui lòng đăng nhập để viết bài!</div>
    }
    const handleFocus = () => {
        const titleElement = document.getElementById("textbox");
        if (titleElement) {
            titleElement.scrollIntoView({ behavior: "smooth" });
        }
    }
    const handleSaveDraft = () => {
        let form = new FormData();
        form.append('content', content);
        form.append('category_id', String(selectedCategory)); //Kiểu number
        form.append('tags', tags);
        form.append('title', title);
        form.append('published_at', publishedAt ? publishedAt : '');
        form.append('status', status)
        console.log(form);
        getSaveDraft(form)
            .then((res) => {
                if (res.success === true) {
                    toast.success(res.message)
                }
                else {
                    toast.error("Có lỗi")
                }
            })
            .catch((e) => toast.error("Có lỗi xảy ra"))
    }
    const handleLoadDraft = () => {
        getLoadDraft().then((res: any) => {
            setContent(res.data.content ? res.data.content : '')
            setSelectedCategory(res.data.category_id ? res.data.category_id : 0)
            setTitle(res.data.title ? res.data.title : '')
            setMdContent(html2md(res.data.content))
            setStatus(res.data.status)
            setPublishedAt(res.data.published_at)
            toast.success('Tải bản nháp thành công')
        });
    }
    return (
        <div className="bg-violet-300">
            <div className="py-1">
                <div className="border-2 border-indigo-700 p-1 rounded-lg">
                    <div className="bg-white p-5 rounded-lg">
                        <div className="flex justify-end gap-2 cursor-pointer">
                            <div onClick={handleFocus} className="border border-indigo-700 px-5 py-2 rounded-md text-indigo-700 hover:border-gray-700 hover:text-gray-700">Focus</div>
                            <div onClick={handleSaveDraft} className="border border-indigo-700 px-5 py-2 rounded-md text-indigo-700 hover:border-gray-700 hover:text-gray-700">Lưu bản nháp</div>
                            <div onClick={handleLoadDraft} className="border border-indigo-700 px-5 py-2 rounded-md text-indigo-700 hover:border-gray-700 hover:text-gray-700">Tải bản nháp</div>
                            <SchedulePost status={status} publishedAt={publishedAt} setPublishedAt={setPublishedAt} setStatus={setStatus} />
                            <PublishButton
                                title={title}
                                selectedCategory={selectedCategory}
                                tags={tags}
                                content={content}
                                status={status}
                                publishedAt={publishedAt}
                            />
                        </div>
                        <div className="flex border-t mt-5 pt-5 border-indigo-700">
                            <div className="w-3/4" id="textbox">
                                <div className="h-svh w-full bg-indigo-700 rounded-lg">
                                    {/* Rich TextBox */}
                                    <MDXEditor mdContent={mdContent} setMdContent={setMdContent} content={content} setContent={setContent} />
                                </div>
                            </div>
                            <div className="w-1/4 sticky">
                                <div className="ml-5 border px-3 border-indigo-700 mb-5 pb-5 rounded-lg">
                                    <div className="text-xl font-bold py-3 border-b border-indigo-700 text-indigo-700 mb-3"><EditOutlined /> Tuỳ chỉnh bài viết</div>
                                    <div>
                                        <div className="mb-2">Tiêu đề bài viết (<span className="text-red-700">*</span>):</div>
                                        <div>
                                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tiêu đề" className="border border-gray-300 px-3 py-1 rounded-md w-full focus:outline-none focus:border-indigo-700" />
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <div className="mb-2">Chọn danh mục:</div>
                                        <select
                                            className="border border-gray-300 px-3 py-1 rounded-md w-full focus:outline-none focus:border-indigo-700"
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(Number(e.target.value))}
                                        >
                                            <option value="" disabled hidden>Chọn danh mục</option>
                                            {categories.map((vl) => (
                                                <option value={vl.id} key={vl.id}>{vl.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mt-5">
                                        <div>Gắn Tag:</div>
                                        <AddTag setTags={setTags} />
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

export default WritePost