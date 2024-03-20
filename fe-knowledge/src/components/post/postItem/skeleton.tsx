
const PostItemSkeleton = () => {
    return (
        <div>
            <div className="border rounded-lg">
                <div className="rounded-lg w-full bg-white p-4 mb-4 animate-pulse">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                        <div className="h-3 bg-gray-300 w-20"></div>
                    </div>
                    <div className="border-t border-b border-indigo-700 bg-gray-300 h-48"></div>
                    <div className="h-6 bg-gray-300 w-4/5 mb-2"></div>
                    <div className="h-4 bg-gray-300 w-3/4"></div>
                    <div className="flex justify-between">
                        <div className="h-4 bg-gray-300 w-1/4"></div>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                                <div className="h-4 w-4 bg-gray-300"></div>
                                <div className="h-4 w-6 bg-gray-300"></div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-4 w-4 bg-gray-300"></div>
                                <div className="h-4 w-6 bg-gray-300"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default PostItemSkeleton