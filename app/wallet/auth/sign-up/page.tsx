import { getLoggedInUser } from '@/actions/bankUseractions'
import AuthForm from '@/app/(protected)/_components/AuthForm'
import React from 'react'

const SignupPage = async () => {

    return (
        <section className="flex-center size-full max-sm:px-6"><AuthForm type="sign-up" /></section>
    )
}

export default SignupPage
