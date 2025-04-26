import {Form, Formik, FormikHelpers} from "formik";
import React, {ReactNode} from "react";
import {className} from "postcss-selector-parser";

interface FormProps {
    submitForm:  (values: any, helpers: FormikHelpers<any>) => Promise<void>,
    validation: object,
    initialValues: object,
    className?: string,
    classNameForm?: string,
    children: ReactNode
    enableReinitialize?: boolean
}
const FormСontainer = ({submitForm, validation, initialValues, className, children, enableReinitialize = false, classNameForm}: FormProps) => {
    return (
        <Formik
            onSubmit={submitForm}
            validationSchema={validation}
            initialValues={initialValues}
            enableReinitialize={enableReinitialize}
        >
            <Form className={`w-full p-5 bg-dark_charcoal rounded-lg mt-4 ${classNameForm}`}>
                <div className={`${className} w-96`}>
                    {children}
                </div>
            </Form>
        </Formik>
    )
}
export default FormСontainer