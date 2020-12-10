import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Row, Col, Button } from 'antd';

// import * as utils from '../../utils';
import Logo from './Logo';
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import SiteContext from '../SiteContext';
import { ping } from '../../utils';

import './index.less';

const RESPONSIVE_XS = 1120;
const RESPONSIVE_SM = 1200;

export interface HeaderProps {
  location: { pathname: string; query: any };
  router: any;
  themeConfig: { docVersions: Record<string, string> };
  changeDirection: (direction: string) => void;
}

interface HeaderState {
  windowWidth: number;
  searching: boolean;
  showTechUIButton: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  static contextType = SiteContext;

  pingTimer: NodeJS.Timeout;

  state = {
    windowWidth: 1400,
    searching: false,
    showTechUIButton: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();

    this.pingTimer = ping(status => {
      if (status !== 'timeout' && status !== 'error') {
        this.setState({
          showTechUIButton: true,
        });
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    clearTimeout(this.pingTimer);
  }

  onWindowResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };

  onTriggerSearching = (searching: boolean) => {
    this.setState({ searching });
  };

  getNextDirectionText = () => {
    const { direction } = this.context;

    if (direction !== 'rtl') {
      return 'RTL';
    }
    return 'LTR';
  };

  render() {
    return (
      <SiteContext.Consumer>
        {() => {
          const { windowWidth, searching, showTechUIButton } = this.state;
          const { direction } = this.context;

          const locale = 'zh-CN';
          const location = {
            action: 'POP',
            basename: '/',
            hash: '',
            key: null,
            pathname: 'components/overview-cn/',
            query: {},
            search: '',
            state: undefined,
          };
          const pathname = 'components/overview-cn/';
          const isHome = ['', 'index', 'index-cn'].includes(pathname);

          const isZhCN = locale === 'zh-CN';
          const isRTL = direction === 'rtl';
          let responsive: null | 'narrow' | 'crowded' = null;
          if (windowWidth < RESPONSIVE_XS) {
            responsive = 'crowded';
          } else if (windowWidth < RESPONSIVE_SM) {
            responsive = 'narrow';
          }

          const headerClassName = classNames({
            clearfix: true,
            'home-header': isHome,
          });

          const sharedProps = {
            isZhCN,
            isRTL,
          };

          const searchBox = <SearchBox key="search" {...sharedProps} />;

          const navigationNode = (
            <Navigation
              key="nav"
              {...sharedProps}
              location={location}
              responsive={responsive}
              showTechUIButton={showTechUIButton}
              pathname={pathname}
              directionText={this.getNextDirectionText()}
            />
          );

          let menu: (React.ReactElement | null)[] = [
            navigationNode,
            <Button
              size="small"
              // onClick={this.onLangChange}
              className="header-button header-lang-button"
              key="lang-button"
            >
              <FormattedMessage id="app.header.lang" />
            </Button>,
          ];

          if (windowWidth < RESPONSIVE_XS) {
            menu = searching ? [] : [navigationNode];
          } else if (windowWidth < RESPONSIVE_SM) {
            menu = searching ? [] : menu;
          }
          const colProps = isHome
            ? [{ flex: 'none' }, { flex: 'auto' }]
            : [
                {
                  xxl: 4,
                  xl: 5,
                  lg: 6,
                  md: 6,
                  sm: 24,
                  xs: 24,
                },
                {
                  xxl: 20,
                  xl: 19,
                  lg: 18,
                  md: 18,
                  sm: 0,
                  xs: 0,
                },
              ];

          return (
            <header id="header" className={headerClassName}>
              <Row style={{ flexFlow: 'nowrap', height: 64 }}>
                <Col {...colProps[0]}>
                  <Logo />
                </Col>
                <Col {...colProps[1]} className="menu-row">
                  {searchBox}
                  {menu}
                </Col>
              </Row>
            </header>
          );
        }}
      </SiteContext.Consumer>
    );
  }
}

export default injectIntl(Header as any);
