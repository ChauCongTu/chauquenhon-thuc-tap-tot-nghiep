import React from "react";
import { User } from "../../../../modules/users/types/type";
import PageNotFound from "../../../error";

interface Props {
    user: User | null;
}

const MyInformation: React.FC<Props> = ({ user }) => {
    if (!user) {
        return <PageNotFound />;
    }
    const isGoogleLinked = user.google_id !== null;

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Thông tin cá nhân</div>
                <div className="mb-4 flex">
                    <label className="block text-gray-700 font-bold mb-2">ID:</label>
                    <p className="text-gray-900 ml-5">{user.id}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Username:</label>
                    <p className="text-gray-900">knowledge.tgl-cloud-com/{user.username}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email:</label>
                    <p className="text-gray-900">{user.email}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Họ tên:</label>
                    <p className="text-gray-900">{user.full_name}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Liên kết với Google:</label>
                    <p className="text-gray-900">{isGoogleLinked ? "Có" : "Không"}</p>
                </div>
            </div>
        </div>
    );
};

export default MyInformation;
