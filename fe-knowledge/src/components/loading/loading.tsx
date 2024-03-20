import React from 'react'

type Props = {
    loading: boolean
}

const PageLoading: React.FC<Props> = ({ loading }) => {
    return (
        loading &&
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50`}>
            <div className="animate-spin rounded-full h-32 w-32 fixed border-b-8 border-indigo-700"></div>
            <div className="animate-spin rounded-full h-32 w-32 fixed border-t-8 border-orange-500"></div>
        </div>
    )
}

export default PageLoading
