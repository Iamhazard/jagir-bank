'use clinet'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { ComponentType, useEffect, useState } from 'react';
import Loader from '@/Components/common/Loader';

type WithAdminProps = {
    Component: ComponentType<any>;
};

const withFreelance = (Component: ComponentType<any>) => {

    const AdminComponent = (props: any) => {
        const { data: session, status } = useSession();
        const router = useRouter();
        const loading = status === 'loading';

        useEffect(() => {
            if (!loading && (!session || session.user.role !== 'Freelancer')) {
                router.push('/');
            }
        }, [loading, session, router]);

        if (loading || !session || session.user.role !== 'Freelancer') {
            return <div> {loading && <Loader />}</div>;
        }

        return <Component {...props} />;
    };

    return AdminComponent;
};

export default withFreelance;
