import React from 'react';
import './Layout.css';

const Layout = ({ children, sidebar, header }) => {
    return (
        <div className="layout">
            {header}
            <div className="layout-body">
                {sidebar}
                <main className="main-content">
                    <div className="main-content-inner">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;