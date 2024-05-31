import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getLike, getPost } from "../../modules/post/service/postService";
import MostLiked from "../rightNav";
import PageLoading from "../loading/loading";
import { formatTime, strToTime } from "../../utils/time";
import { Avatar, Drawer } from "antd";
import { HeartOutlined, EyeOutlined, MenuOutlined, EditOutlined } from '@ant-design/icons';
import toast from "react-hot-toast";
import Comment from "./comment";
import 'react-markdown-editor-lite/lib/index.css';
import tocbot from 'tocbot';
import { useAuth } from "../../providers/AuthProvider";
import type { DrawerProps } from 'antd';
import './index.scss';
import { calculateMinRead } from "../../utils/post";

const Post = () => {
    const { isLoggedIn, user } = useAuth();
    const params = useParams();
    const [post, setPost] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [heartStyle, setHeartStyle] = useState('text-rose-700');
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('left');
    useEffect(() => {
        setLoading(true)
        getPost(params.slug ? params.slug : '')
            .then((e: any) => {
                if (e.success === true) {
                    setPost(e.data);
                    makeIds();
                    tocbot.init({
                        tocSelector: '.js-toc',
                        contentSelector: '.prose',
                        headingSelector: 'h1, h2, h3',
                    });
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [params.slug]);

    if (!post) return;
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const handleLike = () => {
        getLike(post.id)
            .then((res) => {
                if (res.success === true) {
                    if (res.data == 'like') {
                        setHeartStyle('bg-rose-700');
                        post.like_count = post.like_count + 1;
                    }
                    else {
                        setHeartStyle('text-rose-700');
                        post.like_count = post.like_count - 1;
                    }
                }
            })
            .catch(() => toast.error('Vui lòng đăng nhập để thả tym cho bài viết'))
    }
    /* eslint no-var: off */

    function makeIds() {
        setLoading(true);
        const content = document.querySelector('.prose') as HTMLElement | null;
        if (content) {
            const headings = content.querySelectorAll('h1, h2, h3');
            const headingMap: { [id: string]: number } = {};

            headings.forEach((heading: any) => {
                const id = heading.id ? heading.id : heading.innerText.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0;
                if (headingMap[id]) {
                    heading.id = `${id}-${headingMap[id]}`;
                } else {
                    heading.id = id;
                }
            });
        }
    }
    return (
        <div className="bg-violet-300">
            <div className="py-1 px-3 lg:px-36">
                <div className="border-2 border-indigo-700 p-1 rounded-lg">
                    <div className="bg-white p-5 rounded-lg">
                        <div className="flex gap-4 mb-5 items-center">
                            <div className="bg-orange-500 text-white px-5 rounded-lg shadow">{post.category.name}</div>
                            <div className="font-semibold text-orange-500">{formatTime(strToTime(post.published_at), 'HH:mm dd/MM/yyyy')}</div>
                            <div>-</div>
                            <div>Khoảng {calculateMinRead(post.content)} phút đọc</div>
                        </div>
                        <div className="border-b border-t py-5 border-gray-400 text-4xl font-bold text-indigo-700" id="title">{post.title}</div>
                        <div className="flex mt-5 justify-between">
                            <div className="flex items-center gap-2 font-bold"><Avatar src={post.author.avatar} size={'small'} /> {post.author.full_name}</div>
                            <div className="flex gap-5">
                                <div className="bg-gray-200 px-3 py-1 hover:shadow rounded cursor-pointer" onClick={handleLike}>
                                    <HeartOutlined className={`text-rose-700 mr-3`} /> {post.like_count}
                                </div>
                                <div className="bg-gray-200 px-3 py-1 hover:shadow rounded cursor-pointer"><EyeOutlined className="mr-3" /> {post.view_count}</div>
                                {
                                    (isLoggedIn && user?.id === post.author.id)
                                    && <Link to={`/${post.slug}/edit`} className="bg-gray-200 px-3 py-1 hover:shadow rounded cursor-pointer">
                                        <EditOutlined className={``} />
                                    </Link>
                                }

                            </div>
                        </div>
                        <div className="flex flex-wrap mt-5">
                            <div className="w-full lg:w-2/3">
                                <div className="mr-14">
                                    <div className=" max-w-full w-full">
                                        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content ? post.content : '' }} />
                                    </div>
                                    <div className="mt-5 flex border-t border-gray-400 pt-5">
                                        <div className="mr-5">Tags:</div>
                                        {post.tags.map((e: any) => (
                                            <div>
                                                <Link to={`/tags/${e}`} className="border mr-5 px-2 rounded-lg border-indigo-700 text-indigo-700">#{e}</Link>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <Comment post_id={post.id} />
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
            <button className="fixed shadow rounded-lg flex z-50 top-1/2 bg-slate-100 text-slate-400 text-3xl px-2 py-2" onClick={showDrawer}>
                <MenuOutlined />
            </button>
            <Drawer
                title="Nội dung chính"
                placement={placement}
                closable={false}
                onClose={onClose}
                open={open}
                key={placement}
            >
                <div className="js-toc"></div>
            </Drawer>
            <PageLoading loading={loading} />
        </div>
    )
}

export default Post