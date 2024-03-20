import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { UserOutlined, CloseOutlined } from '@ant-design/icons';
import { User } from "../../../modules/users/types/type";
import { Link } from "react-router-dom";
import { getUsers } from "../../../modules/users/service/user";


const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
    }, []);

    const handleGrantPermission = (record: User) => {
        console.log('Phân quyền người dùng:', record);
    };

    const handleBanUser = (record: User) => {
        console.log('Ban người dùng:', record);
    };

    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar: string) => <img src={avatar} alt="avatar" style={{ width: 50, borderRadius: '50%' }} />,
        },
        {
            title: 'Google',
            dataIndex: 'google_id',
            key: 'google_id',
            render: (googleId: string | null) => googleId ? <span style={{ color: 'green' }}>Kết nối</span> : <span style={{ color: 'red' }}>Không</span>,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text: string, record: User) => (
                <span className="space-x-2">
                    <Button icon={<UserOutlined />} onClick={() => handleGrantPermission(record)} disabled>Phân quyền</Button>
                    <Button danger icon={<CloseOutlined />} onClick={() => handleBanUser(record)} disabled>Ban</Button>
                </span>
            ),
        },
    ];

    return (
        <div>
            <div className="bg-violet-300">
                <div className="py-1 px-3 lg:px-36">
                    <div className="border-2 border-indigo-700 p-1 rounded-lg">
                        <div className="bg-white p-5 rounded-lg">
                            <div className='border-b-2 border-indigo-700 font-bold text-3xl pb-3 mb-3'>Quản lý người dùng</div>
                            <div>
                                <Table dataSource={users} columns={columns} pagination={{ hideOnSinglePage: true, pageSize: 5 }} />
                                <div>
                                    <Link to={'/admin'}>Quay lại</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
