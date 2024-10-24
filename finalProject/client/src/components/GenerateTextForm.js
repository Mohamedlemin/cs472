import React from 'react';
import { Input, Button, Spin } from 'antd';

const GenerateTextForm = ({ customPrompt, onChange, onClick, loading }) => {
  return (
    <div>
      <Input
        placeholder={customPrompt ? customPrompt : `From where this word come from?`}
        value={customPrompt}
        onChange={onChange}
        style={{ marginBottom: '16px' }}
      />
      <Button
        type="primary"
        onClick={onClick}
        style={{ backgroundColor: 'green', color: 'white' }}
      >
        {loading ? <Spin size="small" /> : 'Generate Text'}
      </Button>
    </div>
  );
};

export default GenerateTextForm;