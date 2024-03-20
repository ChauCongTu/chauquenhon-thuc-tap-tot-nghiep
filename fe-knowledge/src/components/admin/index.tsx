import { Layout } from 'antd';
import {
    AppstoreOutlined,
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div className="bg-violet-300">
            <div className="py-1 px-3 lg:px-36">
                <div className="border-2 border-indigo-700 p-1 rounded-lg">
                    <div className="bg-white p-5 rounded-lg">
                        <Layout>
                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <Link to={'/categories'} className="bg-gray-200 hover:bg-gray-300 p-6 text-center rounded-lg block">
                                        <AppstoreOutlined className="text-4xl mb-4 text-gray-600" />
                                        <h2 className="text-xl font-semibold mb-2">Quản lý danh mục</h2>
                                    </Link>
                                    <Link to={'/posts'} className="bg-gray-200 hover:bg-gray-300 p-6 text-center rounded-lg block">
                                        <FileOutlined className="text-4xl mb-4 text-gray-600" />
                                        <h2 className="text-xl font-semibold mb-2">Quản lý bài viết</h2>
                                    </Link>
                                    <Link to={'/users'} className="bg-gray-200 hover:bg-gray-300 p-6 text-center rounded-lg block">
                                        <UserOutlined className="text-4xl mb-4 text-gray-600" />
                                        <h2 className="text-xl font-semibold mb-2">Quản lý người dùng</h2>
                                    </Link>
                                </div>
                            </div>
                        </Layout>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
