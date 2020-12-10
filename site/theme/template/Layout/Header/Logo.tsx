import * as React from 'react';

import './Logo.less';

export interface LogoProps {
  isZhCN: boolean;
  location: any;
}

const Logo = () => {
  return (
    <h1 id="logo">
      <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
      Ant Design
    </h1>
  );
};

export default Logo;
