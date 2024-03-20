import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Category } from "../../../../modules/categories/types/type";
import { storeCategory } from "../../../../modules/categories/service/service";
import toast from "react-hot-toast";

type Props = {
    categories: Category[],
    setCategories: Function
}

const CreateCategory: React.FC<Props> = ({ categories, setCategories }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = () => {
        form
            .validateFields()
            .then(values => {
                const newCategory: { id: number, name: string, summary: string } = {
                    id: categories.length + 1,
                    name: values.name,
                    summary: values.summary
                };

                // Call function api
                storeCategory(newCategory).then((res) => {
                    if (res.success) {
                        toast.success('Tạo danh mục thành công!')
                        setCategories([...categories, newCategory]);
                        form.resetFields();
                    }
                    else{
                        toast.error('Bạn không có quyền thêm danh mục!')
                    }
                });
                setIsModalVisible(false);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal} className='bg-indigo-700 mb-3'>
                Thêm
            </Button>
            <Modal
                title="Thêm mới"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleSave}
                okButtonProps={{ style: { background: '#C4B5FD' } }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tiêu đề 2" name="summary">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default CreateCategory;
