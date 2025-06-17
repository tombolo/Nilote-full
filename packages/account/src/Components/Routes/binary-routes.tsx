import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { observer, useStore } from '@deriv/stores';
import { Localize } from '@deriv/translations';

import getRoutesConfig from '../../Constants/routes-config';
import { TBinaryRoutes, TRoute } from '../../Types';

import RouteWithSubRoutes from './route-with-sub-routes';

const BinaryRoutes = observer((props: TBinaryRoutes) => {
    const { common } = useStore();
    const { current_language } = common;
    return (
        <React.Suspense
            fallback={
                <div>
                    <Localize i18n_default_text='Loading...' />
                </div>
            }
        >
            <Routes>
                <Route path="/" element={<Navigate to="/bot" replace />} />
                {getRoutesConfig().map((route: TRoute, idx: number) => (
                    <RouteWithSubRoutes key={`${idx}_${current_language}`} {...route} {...props} />
                ))}
            </Routes>
        </React.Suspense>
    );
});

export default BinaryRoutes;