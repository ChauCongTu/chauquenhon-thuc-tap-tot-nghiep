import { Image } from "antd"

const PageNotFound = () => {
    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="max-w-md mx-auto text-center my-5">
                    <Image width={'50%'} src="/logo.png" alt="TGL Logo" preview={false} />
                    <h2 className="text-4xl font-bold mb-8 mt-5">404 - Trang không tồn tại</h2>
                    <p className="text-lg text-gray-600 mb-4">Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
                    <a href="/" className="text-blue-500 hover:text-blue-700">Quay lại trang chủ</a>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound