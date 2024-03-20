import React, { useEffect, useState } from "react";
import { Button, Input, Avatar, Pagination, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from "../../../providers/AuthProvider";
import { getComment, getCommentLists } from "../../../modules/post/service/postService";
import { CommentType } from "../../../modules/post/type/postType";

const { TextArea } = Input;

interface Prop {
    post_id: number
}

const Comment: React.FC<Prop> = ({ post_id }) => {
    const { isLoggedIn, user } = useAuth();
    const [comments, setComments] = useState<CommentType[]>([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getCommentLists(post_id)
            .then((res) => {
                setComments(res.data.data)
                setTotal(res.data.total);
                setCurrent(res.data.current_page)
            })
    }, []);

    const onFinish = (values: any) => {
        getComment(post_id, values)
            .then((res) => {
                setComments([res.data, ...comments]);
            })
            .catch((error) => {
                console.error("Failed to send comment:", error);
            });
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (page: number) => {
        getCommentLists(post_id, { page: page })
            .then((res) => {
                setComments(res.data.data)
                setTotal(res.data.total);
                setCurrent(res.data.current_page)
            })
    }

    return (
        <div className="mt-10 border-t pt-5 border-gray-400">
            <div className="font-bold text-xl mb-4">Leave a Comment</div>
            {
                isLoggedIn
                    ? <div className="border border-gray-300 rounded-lg p-4">
                        <div className="flex items-center mb-4">
                            <Avatar src={user?.avatar} />
                            <div className="ml-2">{user?.full_name}</div>
                        </div>
                        <Form
                            name="comment-form"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <div className="mb-4">
                                <Form.Item
                                    name={'content'}
                                    rules={[{ required: true, message: 'Please input your comment!' }]}
                                    key="comment-form-content"
                                >
                                    <TextArea
                                        className="border border-gray-300 rounded-lg w-full"
                                        placeholder="Write your comment here"
                                        rows={4}
                                        name="content"
                                        required
                                    />
                                </Form.Item>
                            </div>
                            <div>
                                <Button className="rounded-lg bg-indigo-700 text-white" htmlType="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </div>
                    : <div className="text-center">Vui lòng đăng nhập để bình luận</div>
            }

            <div className="mt-5">
                {
                    comments.map((e) => (
                        <div key={e.id} className="mb-5 border border-gray-300 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <UserOutlined className="text-2xl" />
                                <div className="ml-2">{e.author.full_name}</div>
                            </div>
                            <div className="text-gray-800">
                                {e.content}
                            </div>
                        </div>
                    ))
                }
                <Pagination current={current} total={total} pageSize={12} onChange={handleChange} hideOnSinglePage responsive data-aos="fade-up" />
            </div>
        </div>
    );
};

export default Comment;
