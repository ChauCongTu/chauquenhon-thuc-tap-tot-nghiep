import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { getAddTag } from '../../../../../modules/post/service/postService';

type Props = {
    change: boolean,
    setChange: Function
}

const CreateNewTag: React.FC<Props> = ({ setChange, change }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tag, setTag] = useState("");
    const [msg, setMsg] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (!tag) {
            setMsg('*Vui lòng nhập tag cần thêm')
        }
        else {
            let formData = new FormData();
            formData.append('name', tag);
            getAddTag(formData).then(() => {
                setChange(!change);
            });
            setTag('');
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Button onClick={showModal} icon={<PlusOutlined />}>
                Thêm
            </Button>
            <Modal title="Thêm TAG mới" open={isModalOpen} onOk={handleOk} okButtonProps={{ className: 'bg-indigo-700' }} okText="Thêm" cancelText="Hủy" onCancel={handleCancel}>
                <div className="mb-2">Nhập tag muốn thêm: (<span className="text-red-700">*</span>):</div>
                <div>
                    <input required type="text" value={tag} placeholder="Nhập tag" onChange={(e) => setTag(e.target.value)} className="border border-gray-300 px-3 py-1 rounded-md w-full focus:outline-none focus:border-indigo-700" />
                </div>
                <div className='mt-1 text-red-600'>
                    {msg}
                </div>
            </Modal>
        </div>
    )
}

export default CreateNewTag