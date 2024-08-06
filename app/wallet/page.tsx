import React from 'react'
import AuthForm from '../(protected)/_components/AuthForm'
import MaxWidthWrapper from '../(protected)/_components/maxwidthWrappers'

const Walletpage = () => {
    return (
        <MaxWidthWrapper>

            <div className='flex justify-center items-center'></div><AuthForm type={'sign-in'} /></MaxWidthWrapper>
    )
}

export default Walletpage