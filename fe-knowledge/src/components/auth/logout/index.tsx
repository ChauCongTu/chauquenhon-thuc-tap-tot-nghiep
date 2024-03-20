import { Modal } from 'antd';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../providers/AuthProvider';


const Logout = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };
    const handleOk = () => {
        logout();
        hideModal();
        navigate('/');
    }
    return (
        <>
            <a onClick={showModal}>
                Đăng xuất
            </a>
            <Modal
                title="Xác nhận thoát"
                open={open}
                onOk={handleOk}
                onCancel={hideModal}
                okText={`Xác nhận`}
                cancelText="Hủy"
                okButtonProps={{ className: 'bg-indigo-700 text-white hover:bg-white' }}
                cancelButtonProps={{ className: 'text-gray-500 hover:text-gray-700' }}
            >
                <p>Bạn có chắc chắn muốn thoát phiên làm việc</p>
            </Modal>
        </>
    );
}

export default Logout;
