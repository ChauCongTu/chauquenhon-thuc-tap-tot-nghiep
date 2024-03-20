import { Rule } from 'antd/lib/form';

export const emailValidationRules: Rule[] = [
    {
        required: true,
        message: 'Vui lòng nhập địa chỉ email!',
    },
    {
        type: 'email',
        message: 'Địa chỉ email không hợp lệ!',
    },
];

export const passwordValidationRules: Rule[] = [
    {
        required: true,
        message: 'Vui lòng nhập mật khẩu!',
    },
    {
        min: 6,
        message: 'Mật khẩu phải có ít nhất 6 kí tự!',
    }
];

export const passwordConfirmationRules: Rule[] = [
    {
        required: true,
        message: 'Vui lòng nhập lại mật khẩu',
    },
    {
        min: 6,
        message: 'Mật khẩu phải có ít nhất 6 kí tự!',
    }
]

export const userNameRules: Rule[] = [
    {
        required: true,
        message: 'Vui lòng nhập tên đăng nhập',
    },
    {
        min: 5,
        message: 'Username phải có ít nhất 6 kí tự!',
    },
    {
        max: 255,
        message: 'Username với tối đa 255 kí tự!'
    }
]

export const fullNameRule: Rule[] = [
    {
        required: true,
        message: 'Vui lòng nhập họ tên',
    },
    {
        min: 5,
        message: 'Họ tên phải có ít nhất 6 kí tự!',
    },
    {
        max: 255,
        message: 'Họ tên với tối đa 255 kí tự!'
    }
]