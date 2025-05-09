import * as Yup from 'yup'
export const Create = Yup.object().shape({
    name: Yup.string()
        .required('Имя обязательно'),
    email: Yup.string()
        .email('Некорректный email')
        .required('Email обязателен'),
    password: Yup.string()
        .min(8, 'Пароль должен быть не менее 8 символов')
        .required('Пароль обязателен')
        .oneOf(
            [Yup.ref('password_confirmation')],
            'Пароли должны совпадать'
        ),
    password_confirmation: Yup.string()
        .min(8, 'Пароль должен быть не менее 8 символов')
        .required('Подтверждение пароля обязательно'),
})

export const Update = Yup.object().shape({
    name: Yup.string()
        .required('Имя обязательно'),
    email: Yup.string()
        .email('Некорректный email')
        .required('Email обязателен'),
    password_confirmation: Yup.string()
        .min(8, 'Пароль должен быть не менее 8 символов'),
    password: Yup.string()
        .min(8, 'Пароль должен быть не менее 8 символов')
        .oneOf([Yup.ref('password_confirmation')], 'Пароли должны совпадать'),
})
export const UpdateRole = Yup.object().shape({
    role: Yup.string()
        .required('Выберите роль')
        .matches(/^roleId_\d+$/, 'Выберите корректную роль')
});
export const Close = Yup.object().shape({
    id: Yup.string()
        .required('# ID должен быть обязательно.'),
    is_closed: Yup.boolean()
        .required('Соглашение должно быть'),
    agreement: Yup.boolean()
})
