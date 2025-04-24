import {Form, Formik, FormikHelpers} from "formik";
import React, {ReactNode} from "react";

interface FormProps {
    submitForm:  (values: any, helpers: FormikHelpers<any>) => Promise<void>,
    validation: object,
    initialValues: object,
    children: ReactNode
}
const FormСontainer = ({submitForm, validation, initialValues, children}: FormProps) => {
    return (
        <Formik
            onSubmit={submitForm}
            validationSchema={validation}
            initialValues={initialValues}
        >
            <Form className="w-full p-5 bg-dark_charcoal rounded-lg mt-4">
                <div className="w-96">
                    {children}
                </div>
            </Form>
        </Formik>
    )
}
export default FormСontainer