import { Link } from 'react-router-dom';
import { Dropdown, Avatar, Space } from 'antd';
import { LoginOutlined, SettingOutlined, KeyOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';
import { useAuth } from '../../../providers/AuthProvider';
import Logout from '../../auth/logout';

const AvatarUser = () => {
    const { isLoggedIn, user } = useAuth();

    // Items cho trường hợp đã đăng nhập
    const loggedInItems = [
        {
            key: '1',
            label: (
                <Link to="/profile">
                    Hồ sơ
                </Link>
            ),
            icon: <Avatar src={user?.avatar} size={'small'} />
        },
        {
            key: '2',
            label: (
                <Link to={"/post"}>
                    Viết bài
                </Link>
            ),
            icon: <EditOutlined />
        },
        {
            key: '3',
            label: (
                <Link to={"/admin"}>
                    Quản trị
                </Link>
            ),
            icon: <SettingOutlined />
        },
        {
            key: '4',
            label: (< Logout />),
            icon: <LogoutOutlined />
        }
    ];

    // Items cho trường hợp chưa đăng nhập
    const loggedOutItems = [
        {
            key: '1',
            label: (
                <Link to="/login">
                    Đăng nhập
                </Link>
            ),
            icon: <LoginOutlined />
        },
        {
            key: '2',
            label: (
                <Link to="/register">
                    Đăng ký
                </Link>
            ),
            icon: <KeyOutlined />
        }
    ];

    return (
        <Dropdown menu={{ items: isLoggedIn ? loggedInItems : loggedOutItems }} className='mt-3'>
            <a onClick={(e) => e.preventDefault()} className='text-black hover:text-sky-800'>
                <Space>
                    {isLoggedIn ? <Avatar src={user?.avatar} /> : <Avatar />}
                    {isLoggedIn ? user?.full_name : 'Tài khoản'}
                </Space>
            </a>
        </Dropdown>
    );
}

export default AvatarUser;
