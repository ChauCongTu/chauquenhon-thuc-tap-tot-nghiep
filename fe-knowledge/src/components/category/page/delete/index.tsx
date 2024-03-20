import React, { useState } from "react";
import { Modal, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Category } from "../../../../modules/categories/types/type";
import { deleteCategory } from "../../../../modules/categories/service/service";
import toast from "react-hot-toast";

type Props = {
    category: Category;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const DeleteCategory: React.FC<Props> = ({ category, categories, setCategories }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = () => {
        deleteCategory(category.id).then((e) => {
            if (e.success) {
                const updatedCategories = categories.filter(cat => cat.id !== category.id);
                setCategories(updatedCategories);
                toast.success("Xóa danh mục thành công!")
            }
            else {
                toast.error('Có lỗi xảy ra, vui lòng thử lại!')
            }
        })
        setIsModalVisible(false);
    };

    return (
        <div>
            <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={showModal}
                className="mb-3"
            >
                Xóa
            </Button>
            <Modal
                title="Xác nhận xóa"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="delete" type="primary" danger onClick={handleDelete}>
                        Xóa
                    </Button>,
                ]}
            >
                <p>Bạn có chắc chắn muốn xóa danh mục "{category.name}" không?</p>
            </Modal>
        </div>
    );
};

export default DeleteCategory;
