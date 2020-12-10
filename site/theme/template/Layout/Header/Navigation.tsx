import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Link } from 'bisheng/router';
import { Menu } from 'antd';
import * as utils from '../../utils';
import { SharedProps } from './interface';

import './Navigation.less';

export interface NavigationProps extends SharedProps {
  isMobile: boolean;
  isRTL: boolean;
  pathname: string;
  responsive: null | 'narrow' | 'crowded';
  location: { pathname: string; query: any };
  directionText: string;
  showTechUIButton: boolean;
  onLangChange: () => void;
  onDirectionChange: () => void;
}

export default ({ isZhCN, isMobile, pathname, location }: NavigationProps) => {
  const menuMode = isMobile ? 'inline' : 'horizontal';

  const module = pathname.split('/').slice(0, -1).join('/');
  let activeMenuItem = module || 'home';
  if (location.pathname === 'changelog' || location.pathname === 'changelog-cn') {
    activeMenuItem = 'docs/react';
  } else if (location.pathname === 'docs/resources' || location.pathname === 'docs/resources-cn') {
    activeMenuItem = 'docs/resources';
  }

  return (
    <Menu
      className={classNames('menu-site')}
      mode={menuMode}
      selectedKeys={[activeMenuItem]}
      id="nav"
    >
      <Menu.Item key="docs/spec">
        <Link to={utils.getLocalizedPathname('/docs/spec/introduce', isZhCN, location.query)}>
          <FormattedMessage id="app.header.menu.spec" />
        </Link>
      </Menu.Item>
      <Menu.Item key="components">
        <Link to={utils.getLocalizedPathname('/components/overview/', isZhCN, location.query)}>
          <FormattedMessage id="app.header.menu.components" />
        </Link>
      </Menu.Item>
    </Menu>
  );
};
