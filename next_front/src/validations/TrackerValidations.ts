import * as Yup from 'yup'
export const Create = Yup.object().shape({
    name: Yup.string()
        .required('# Навзание должно быть обязательно.')
        .min(2, '# Название должно содержать минимум 2 символа')
        .max(20, '# Название должно быть не больше 10 символов'),
    project_id: Yup.number()
        .required('# ID проекта должен быть обязательно')
})

export const Update = Yup.object().shape({
    id: Yup.string()
        .required('# ID должен быть обязательно.'),
    name: Yup.string()
        .required('# Навзание должно быть обязательно.')
        .min(2, '# Название должно содержать минимум 2 символа')
        .max(10, '# Название должно быть не больше 10 символов'),
    project_id: Yup.number()
        .required('# ID проекта должен быть обязательно')
})

export const Close = Yup.object().shape({
    id: Yup.string()
        .required('# ID должен быть обязательно.'),
    is_closed: Yup.boolean()
        .required('Соглашение должно быть'),
    agreement: Yup.boolean()
})
