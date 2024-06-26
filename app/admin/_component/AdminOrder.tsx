// lib/withAdmin.tsx
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { Children, ComponentType, useEffect } from 'react';
import Loader from '@/Components/common/Loader';

type WithAdminProps = {
    Component: ComponentType<any>;
};

const withAdmin = (Component: ComponentType<any>) => {
    const AdminComponent = (props: any) => {
        const { data: session, status } = useSession();
        const router = useRouter();
        const loading = status === 'loading';

        useEffect(() => {
            if (!loading && (!session || session.user.role !== 'ADMIN')) {
                router.push('/');
            }
        }, [loading, session, router]);

        if (loading || !session || session.user.role !== 'ADMIN') {
            return <div> {loading ? <Loader /> : 'Not Authorized'} </div>;

        }

        return <Component {...props} />;
    };

    return AdminComponent;
};

export default withAdmin;
