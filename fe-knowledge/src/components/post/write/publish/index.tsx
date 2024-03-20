import { Divider, Drawer } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import UploadImage from '../../../demo/upload';
import { Link } from 'react-router-dom';
import { getSavePost } from '../../../../modules/post/service/postService';

type Props = {
    title: string | null,
    selectedCategory: number | null,
    tags: string[] | null,
    content: string | null,
    status: string,
    publishedAt: string | null,
};

const PublishButton: React.FC<Props> = ({ title, selectedCategory, tags, content, status, publishedAt }) => {
    const [open, setOpen] = useState(false);
    const [thumb, setThumb] = useState('');
    const category_id = selectedCategory;
    const showDrawer = () => {
        if (!title || !selectedCategory || !tags || !content) {
            toast.error('Vui lòng nhập đầy đủ thông tin');
        }
        else {
            setOpen(true);
        }
    };

    const onClose = () => {
        setOpen(false);
    };
    const handlePublish = async () => {
        if (!thumb) {
            toast.error('Vui lòng tải lên ảnh thumb');
            return;
        }

        try {
            const response = await getSavePost({
                title,
                category_id,
                tags,
                content,
                thumb,
                status,
                published_at: publishedAt
            });
            if (response.success) {
                toast.success('Xuất bản bài viết thành công');
                onClose();
            } else {
                console.log(response);
                toast.error('Xuất bản bài viết thất bại');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi xuất bản bài viết');
        }
    }

    return (
        <div>
            <div onClick={showDrawer} className="border border-indigo-700 bg-indigo-700 px-5 py-2 rounded-md text-gray-50 hover:bg-gray-50 hover:text-indigo-700">Xuất bản</div>
            <Drawer
                title="Xác nhận lại bài viết của bạn"
                placement="right"
                onClose={onClose}
                visible={open}
                className="w-full md:w-1/2 lg:w-1/3"
            >
                <div>
                    <div className="flex flex-col">
                        <div className="flex">
                            <div className="w-1/4 font-semibold">Tiêu đề:</div>
                            <div className="w-3/4">{title}</div>
                        </div>
                        <div className="flex mt-5">
                            <div className="w-1/4 font-semibold">Danh mục:</div>
                            <div className="w-3/4">{selectedCategory}</div>
                        </div>
                        <div className="flex mt-5">
                            <div className="w-1/4 font-semibold">Tags:</div>
                            <div className="w-3/4">{tags?.join(', ')}</div>
                        </div>
                        <div className="flex mt-5">
                            <div className="w-1/4 font-semibold">Trạng thái:</div>
                            <div className="w-3/4">{status == 'publish' ? 'Sẵn sàng xuất bản' : 'Lập kế hoạch'}</div>
                        </div>
                        <div className="flex mt-5">
                            <div className="w-1/4 font-semibold">Lên bài lúc:</div>
                            <div className="w-3/4">{publishedAt ? publishedAt : 'Ngày lập tức'}</div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <div className='font-semibold'>Nội dung: </div>
                        <div className='h-36 overflow-y-auto'>
                            <div dangerouslySetInnerHTML={{ __html: content ? content : '' }} />
                        </div>
                    </div>
                    <div className='font-bold'>Chỉ còn 1 bước để xuất bản bài viết của bạn</div>
                    <div className='mt-5'>
                        <div className='font-semibold'>Tải lên ảnh thumb:</div>
                        <div className='mt-2'>
                            <UploadImage setImageString={setThumb} />
                        </div>
                    </div>
                    <Divider />
                    <Link to={'#'}>Quy định về bài viết</Link>
                    <Divider />
                    <div className='mt-5 flex gap-2'>
                        <button onClick={handlePublish} className="border border-indigo-700 bg-indigo-700 px-5 py-2 rounded-md text-gray-50 hover:bg-gray-50 hover:text-indigo-700">Xuất bản</button>
                        <button onClick={handlePublish} className="border border-indigo-700 bg-white px-5 py-2 rounded-md text-indigo-700 hover:border-gray-400 hover:text-gray-400">Hủy</button>
                    </div>
                </div>
            </Drawer>
        </div>
    )
};

export default PublishButton;
