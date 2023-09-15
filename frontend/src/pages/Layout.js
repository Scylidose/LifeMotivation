import React from 'react';
import { Outlet } from "react-router-dom";
import SlideMenu from '../components/SlideMenu';

const Layout = ({ token }) => {
    return (
        <>
            <SlideMenu token={token} />
            <Outlet />
        </>
    );
};

export default Layout;