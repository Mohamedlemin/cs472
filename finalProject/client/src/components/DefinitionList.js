import React from 'react';
import { List, Typography, Space } from 'antd';
const { Title, Text } = Typography;

const DefinitionList = ({ definitions, onScroll, loading }) => {
  return (
    <List
      header={<Title level={4}>Definitions 📖</Title>}
      bordered
      style={{
        marginTop: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflowY: 'auto',
        maxHeight: '300px'
      }}
      onScroll={onScroll}
      dataSource={definitions}
      renderItem={(item) => (
        <List.Item>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Text strong style={{ color: '#333' }}>{item.word}</Text>
              {item.wordtype && <Text type="secondary" style={{ color: '#333' }}>({item.wordtype})</Text>}
            </Space>
            <Text style={{ color: '#333' }}>{item.definition}</Text>
          </Space>
        </List.Item>
      )}
    />
  );
};

export default DefinitionList;