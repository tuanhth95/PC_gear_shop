import React from 'react';
import HeaderSearchComponent from '../HeaderSearchComponent/HeaderSearchComponent';
import AppFooter from "../AppFooter/AppFooter";
import AppHeader from "../AppHeader/AppHeader";

const Layout = ({ children }) => {
    return (
        <div>
            {/* <AppHeader/> */}
            <HeaderSearchComponent />
            <div>{children}</div>
            <AppFooter />
        </div>
    );
};

export default Layout;
