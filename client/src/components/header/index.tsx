import React from 'react';

import LogoSvgComponent from 'assets/svg/logo';

const Header: React.FC = () => {
    return (
        <nav className="flex justify-center items-center w-full box-border bg-blue-900 mb-10">
            <LogoSvgComponent height='100px'/>
        </nav>
    )
}
export default Header