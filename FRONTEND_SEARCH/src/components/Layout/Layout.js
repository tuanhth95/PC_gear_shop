// src/components/Layout.js
import React from 'react';
import HeaderSearchComponent from '../HeaderSearchComponent/HeaderSearchComponent';

const Layout = ({ children }) => {
    return (
        <div>
            <HeaderSearchComponent />
            <div>{children}</div>
        </div>
    );
};

export default Layout;
