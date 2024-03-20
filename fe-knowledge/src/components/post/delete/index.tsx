import React, { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { getDeletePost } from '../../../modules/post/service/postService';
import toast from 'react-hot-toast';

type Props = {
    post_id: number
}

const DeletePost: React.FC<Props> = ({ post_id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        getDeletePost(post_id).then(() => toast.success('Xóa bài viết thành công'))
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <button onClick={showModal}>
                <DeleteOutlined />
            </button>
            <Modal title="Xóa bài viết" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc muốn xóa bài viết này không?</p>
            </Modal>
        </div >
    )
}

export default DeletePost