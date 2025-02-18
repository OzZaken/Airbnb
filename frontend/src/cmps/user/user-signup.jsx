import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export const SignupForm = () => {
    return <section className='user-signup'>
        <h1>Signup</h1>
        <Formik formik={...formik} onSubmit={onSubmit}>
            {({ errors, touched }) => <Form>
                <Field as={TextField} name="firstName" />
                {errors.firstName && touched.firstName ? (
                    <span>{errors.firstName}</span>
                ) : null}

                <Field as={TextField} name="lastName" />
                {errors.lastName && touched.lastName ? (
                    <div>{errors.lastName}</div>
                ) : null}

                <Field as={TextField} name="email" type="email" />
                {errors.email && touched.email ? <div>{errors.email}</div> : null}

                <Field as={TextField} name="username" />
                {errors.username && touched.username ? (
                    <div>{errors.username}</div>
                ) : null}

                <Field as={TextField} name="password" type="password" />
                {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                ) : null}

                <Button variant="contained" type="submit">Submit!</Button>
            </Form>}
        </Formik>
    </section>
}

const formik = {
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(7, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        username: Yup.string()
            .min(3, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .max(20, 'Password cannot be longer than 20 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            )
            .required('Required'),
    })
}

const onSubmit = (values) => {
    const user = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
        isAdmin: true,
    }
    console.log(user)
}

const TextField = (props) => (
    <TextField className="my-custom-input" type="text" {...props} />
)