import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchForm = ({ term, onSearch, onChange }) => {
  return (
    <Input.Search
      placeholder="🔍 Search for a term"
      enterButton={<Button type="primary" icon={<SearchOutlined />}>Search</Button>}
      size="large"
      value={term}
      onChange={onChange}
      onSearch={onSearch}
      style={{ marginBottom: '24px' }}
    />
  );
};

export default SearchForm;