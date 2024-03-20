import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Category } from "../../../../modules/categories/types/type";
import { updateCategory } from "../../../../modules/categories/service/service";
import toast from "react-hot-toast";

type Props = {
    category: Category;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const UpdateCategory: React.FC<Props> = ({ category, categories, setCategories }) => {
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
            .then((values) => {
                const updatedCategory: Category = {
                    ...category,
                    name: values.name,
                    summary: values.summary,
                };
                updateCategory(updatedCategory.id ? updatedCategory.id : 0, updatedCategory).then((res) => {
                    if (res.success) {
                        const updatedCategories = categories.map(cat =>
                            cat.id === updatedCategory.id ? updatedCategory : cat
                        );
                        setCategories(updatedCategories);
                        toast.success('Chỉnh sửa danh mục thành công!')
                    }
                    else {
                        toast.error('Có lỗi xảy ra, vui lòng thử lại!')
                    }
                })
                setIsModalVisible(false);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <div>
            <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={showModal}
                className="bg-indigo-700 mb-3"
            >
                Sửa
            </Button>
            <Modal
                title="Sửa thông tin"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleSave}
                okButtonProps={{ style: { background: "#C4B5FD" } }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        name: category.name,
                        summary: category.summary,
                    }}
                >
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tiêu đề 2"
                        name="summary"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UpdateCategory;
