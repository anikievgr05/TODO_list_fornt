import {Form, Formik, FormikHelpers} from "formik";
import React, {ReactNode} from "react";
import {className} from "postcss-selector-parser";

interface FormProps {
    submitForm:  (values: any, helpers: FormikHelpers<any>) => Promise<void>,
    validation: object,
    initialValues: object,
    className?: string,
    children: ReactNode
}
const FormСontainer = ({submitForm, validation, initialValues, className, children}: FormProps) => {
    return (
        <Formik
            onSubmit={submitForm}
            validationSchema={validation}
            initialValues={initialValues}
        >
            <Form className="w-full p-5 bg-dark_charcoal rounded-lg mt-4 ">
                <div className={`${className} w-96`}>
                    {children}
                </div>
            </Form>
        </Formik>
    )
}
export default FormСontainer