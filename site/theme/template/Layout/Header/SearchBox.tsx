import * as React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { SharedProps } from './interface';

import './SearchBox.less';

export default ({ isZhCN }: SharedProps) => {
  const searchPlaceholder = isZhCN ? '搜索' : 'Search';

  return (
    <div id="search-box">
      <SearchOutlined />
      <Input placeholder={searchPlaceholder} />
    </div>
  );
};
