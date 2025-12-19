import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface SharedPageProps extends InertiaPageProps {
    auth?: {
        user?: any;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}
