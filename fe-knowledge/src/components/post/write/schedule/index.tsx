import { DatePicker, Modal } from 'antd';
import React, { useState } from 'react';
import moment, { Moment } from 'moment';

type Props = {
    publishedAt: string | null,
    setPublishedAt: Function,
    setStatus: Function,
    status: string
}

const SchedulePost: React.FC<Props> = ({ publishedAt, setPublishedAt, setStatus, status }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [time, setTime] = useState<string | null>(publishedAt);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (time) {
            setPublishedAt(time);
            setStatus('schedule')
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (date: Moment | null, dateString: string) => {
        if (date) {
            setTime(dateString);
        }
    };
    const handlePublish = () => {
        setStatus('publish')
        setPublishedAt(null);
        setIsModalOpen(false);
    }

    return (
        <div>
            <button onClick={showModal} className="relative border border-indigo-700 px-5 py-2 rounded-md text-indigo-700 hover:border-gray-700 hover:text-gray-700">
                Đặt lịch
                {
                    publishedAt && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                }
            </button>
            <Modal okButtonProps={{ className: 'bg-indigo-700' }} title="Chọn ngày đăng bài" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="text-center mb-4">Chọn ngày đăng bài:</div>
                <DatePicker
                    showTime={{ format: 'HH:mm:ss' }}
                    format="YYYY-MM-DD HH:mm:ss"
                    value={publishedAt ? moment(publishedAt, "YYYY-MM-DD HH:mm:ss") : null}
                    onChange={handleChange}
                    className="w-full"
                />
                <div className='flex justify-between mt-5 items-center'>
                    <div>Trạng thái: <span className="capitalize">{status}</span></div>
                    <div className="cursor-pointer border px-2 py-1 rounded-lg  " onClick={handlePublish}>Xuất bản ngay</div>
                </div>
            </Modal>
        </div>
    );
}

export default SchedulePost;
