// lib/withAdmin.tsx
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { ComponentType, useEffect } from 'react';

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
            return <div>Loading...</div>;
        }

        return <Component {...props} />;
    };

    return AdminComponent;
};

export default withAdmin;
