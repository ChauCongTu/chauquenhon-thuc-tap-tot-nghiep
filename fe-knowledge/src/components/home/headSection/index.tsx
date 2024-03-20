import { Image } from "antd";

const HeadSeaction = () => {
    return (
        <div>
            <div className="bg-violet-200">
                <div className=" px-1 lg:px-32">
                    <div className="py-10">
                        <div className="border-4 border-indigo-700 rounded-3xl py-6 px-0 bg-violet-200">
                            <div className="px-3 lg:px-3 pt-10">
                                <div className="border-4 border-indigo-700 rounded-3xl bg-white p-5">
                                    <div className="text-4xl text-center font-bold my-7">Nguồn tài nguyên để doanh nghiệp
                                        phát triển trên Internet</div>
                                    <div className="flex justify-center max-w-2xl mx-auto">
                                        <div className="text-center">
                                            Kiến thức tại TGL Knowledge không phải để kiếm tiền, bán khóa học hay các việc kiếm lợi nhuận tương tự.
                                            Chúng tôi chia sẻ miễn phí nguồn tài nguyên dành cho các khách hàng và những bạn đọc quan tâm.
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mx-auto">
                                        <div className="w-1/2 text-center">
                                            <Image preview={false} width={'50%'} src="/logo-knowledge.png" />
                                        </div>
                                        <div className="w-1/2 text-center">
                                            <Image preview={false} width={'80%'} src="/logo.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default HeadSeaction