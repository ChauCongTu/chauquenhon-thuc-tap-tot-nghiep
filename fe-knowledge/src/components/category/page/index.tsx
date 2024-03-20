import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getCategories } from '../../../modules/categories/service/service';
import CreateCategory from './create';
import UpdateCategory from './update';
import DeleteCategory from './delete';
import { Link } from 'react-router-dom';

const CategoryManagement: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        console.log(res.data.data);
        setDataSource(res.data.data);
      })
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tiêu đề 2',
      dataIndex: 'summary',
      key: 'summary',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <div><UpdateCategory category={record} categories={dataSource} setCategories={setDataSource} /><DeleteCategory category={record} categories={dataSource} setCategories={setDataSource} /></div>
      ),
    },
  ];



  return (
    <div className="bg-violet-300">
      <div className="py-1 px-3 lg:px-36">
        <div className="border-2 border-indigo-700 p-1 rounded-lg">
          <div className="bg-white p-5 rounded-lg">
            <div className='border-b-2 border-indigo-700 font-bold text-3xl pb-3 mb-3'>Quản lý danh mục</div>
            <div>
              <div>
                <CreateCategory categories={dataSource} setCategories={setDataSource} />
              </div>
              <Table dataSource={dataSource} columns={columns} pagination={{ hideOnSinglePage: true }} />
              <div>
                <Link to={'/admin'}>Quay lại</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
