'use client'
import Link from 'next/link'
import * as Yup from 'yup'
import { useSearchParams } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'

import { useAuth } from '@/hooks/auth'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import { useEffect, useState } from 'react'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Label from "@/components/Label";
import Button from "@/components/Button";

interface Values {
  email: string
  password: string
  remember: boolean
}

const LoginPage = () => {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<string>('')
  const redirect = searchParams.get('redirect') || '/dashboard' // Извлекаем redirect или используем /dashboard по умолчанию

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: searchParams.get('redirect') || '/',
  })

  useEffect(() => {
    const resetToken = searchParams.get('reset')
    setStatus(resetToken ? atob(resetToken) : '')
  }, [searchParams])

  const submitForm = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>,
  ): Promise<any> => {
    try {
      await login(values)
    } catch (error: Error | AxiosError | any) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
      setStatus('')
    }
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('# The email field is required.'),
    password: Yup.string().required('# The password field is required.'),
  })

  return (
    <AuthCard
      logo={
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-silver_mist" />
        </Link>
      }>
      <AuthSessionStatus className="mb-4" status={status} />

      <Formik
        onSubmit={submitForm}
        validationSchema={LoginSchema}
        initialValues={{ email: '', password: '', remember: false }}>
        <Form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Field
              id="email"
              name="email"
              type="email"
              className="mb-1 block mt-1 w-full rounded-md shadow-sm bg-transparent border-stormy_gray focus:border-indigo-300 focus:ring focus:ring-vivid_violet focus:ring-opacity-50"
            />
            <ErrorMessage
              name="email"
              component="span"
              className="text-sm text-hot_crimson"
            />
          </div>

          <div className="">
            <Label htmlFor="password">Password</Label>

            <Field
              id="password"
              name="password"
              type="password"
              className="mb-1 block mt-1 w-full rounded-md shadow-sm bg-transparent border-stormy_gray focus:border-indigo-300 focus:ring focus:ring-vivid_violet focus:ring-opacity-50"
            />

            <ErrorMessage
              name="password"
              component="span"
              className="text-sm text-hot_crimson"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="remember">
              <Field
                  type="checkbox"
                  name="remember"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-vivid_violet focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />

              <span className="ml-2 underline text-sm text-vivid_violet hover:opacity-75">
                Remember me
              </span>
            </Label>
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link
              href="/forgot-password"
              className="underline text-sm text-vivid_violet hover:opacity-75 mr-2">
              Forgot your password?
            </Link>
            <Button
                type="submit"
            >
              Login
            </Button>
          </div>
        </Form>
      </Formik>
    </AuthCard>
  )
}

export default LoginPage
