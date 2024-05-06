import React from 'react';
import HeaderSearchComponent from '../HeaderSearchComponent/HeaderSearchComponent';
import AppFooter from "../AppFooter";

const Layout = ({ children }) => {
    return (
        <div>
            <HeaderSearchComponent />
            <div>{children}</div>
            <AppFooter />
        </div>
    );
};

export default Layout;
