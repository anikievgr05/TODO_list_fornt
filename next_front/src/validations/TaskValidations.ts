import * as Yup from 'yup'
import { isValid, isAfter, parseISO } from 'date-fns';

export const Create =  Yup.object({
    brief_description: Yup.string()
        .required('Описание обязательно')
        .min(30, 'Минимум 30 символов')
        .max(50, 'Максимум 50 символов'),
    project_id: Yup.number()
        .required('Проект обязателен')
        .positive()
        .integer(),
    tz: Yup.array()
        .of(Yup.mixed<File>())
        .required('Минимум один файл обязателен')
        .min(1, 'Минимум один файл обязателен'),
    responsible_id: Yup.number()
        .nullable(),
    reviewer_id: Yup.number()
        .nullable()
        .typeError('Должно быть числом'),
    tracker_id: Yup.number()
        .required('Трекер обязателен'),
    priority_id: Yup.number()
        .required('Приоритет обязателен'),
    date_end: Yup.date()
        .nullable()
        .test(
            'is-future-date',
            'Дата должна быть больше или равна сегодняшней',
            function (value) {
                if (!value) return true; // пропускаем валидацию, если дата не указана

                const date = typeof value === 'string' ? parseISO(value) : value;

                // Проверяем, что это валидная дата и она >= сегодня
                const isValidDate = isValid(date);
                const isFutureOrToday = isAfter(date, new Date()) || date.getTime() === new Date().setHours(0, 0, 0, 0);

                return isValidDate && isFutureOrToday;
            }
        )
})

export const Update = Yup.object().shape({
    id: Yup.string()
        .required('# ID должен быть обязательно.'),
    name: Yup.string()
        .required('# Навзание должно быть обязательно.')
        .min(2, '# Название должно содержать минимум 2 символа')
        .max(20, '# Название должно быть не больше 20 символов')
})

export const Close = Yup.object().shape({
    id: Yup.string()
        .required('# ID должен быть обязательно.'),
    is_closed: Yup.boolean()
        .required('Соглашение должно быть'),
    agreement: Yup.boolean()
})
