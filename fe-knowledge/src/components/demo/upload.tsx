import React, { useState } from 'react';
import { getUpload } from '../../modules/upload/service/service';
import { UploadResponse } from '../../modules/upload/type/type';
import { Image } from 'antd';

interface Props {
    imageString?: string
    setImageString: Function
}

const UploadImage: React.FC<Props> = ({ imageString, setImageString }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(imageString ? imageString : '');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event: any) => {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('image', selectedFile);

            getUpload(formData)
                .then((res: UploadResponse) => {
                    setImageUrl(res.url);
                    setImageString(res.url);
                });
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };
    const ortherImage = () => {
        setImageUrl("");
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-sm">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <div className="flex justify-center">
                            {imageUrl ? (
                                <><Image width={'100%'} src={imageUrl} /> </>
                            ) : (
                                <div className="text-gray-400">
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer inline-flex items-center justify-center w-full h-full"
                                    >
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 11v24c0 1.104.896 2 2 2h28c1.104 0 2-.896 2-2V21.343l-7.879-7.879A2 2 0 0024.343 12H10c-1.104 0-2 .896-2 2zm0 0h16m4-4v16m-8-8l8 8"
                                            />
                                        </svg>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <div className="mt-[-15px] text-sm text-gray-600">
                                        <p className="font-medium">Kéo và thả hoặc chọn một tệp</p>
                                        <p className="text-xs text-gray-500">JPG, JPEG, PNG up to 5MB</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex justify-center">
                    {
                        imageUrl ? <button onClick={ortherImage} className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${!selectedFile || loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}>Tải ảnh khác</button>
                            : <button
                                onClick={handleUpload}
                                disabled={!selectedFile || loading}
                                className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${!selectedFile || loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {loading ? 'Đang tải ảnh...' : 'Tải ảnh lên'}
                            </button>
                    }

                </div>
            </div>
        </div>
    );
};

export default UploadImage;
