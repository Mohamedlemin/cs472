// src/MainContent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, List, Typography, message, Space, Divider } from 'antd';
import { AudioOutlined, SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MainContent = () => {
  const [term, setTerm] = useState('');
  const [definitions, setDefinitions] = useState([]);
  const [popularTerms, setPopularTerms] = useState([]);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(25);

  useEffect(() => {
    const fetchPopularTerms = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/popular');
        setPopularTerms(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPopularTerms();

    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter === 1) {
          fetchPopularTerms();
          return 25;
        }
        return prevCounter - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    if (!term) {
      setError('Please enter a term to search');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5001/api/search?term=${term}`);
      setDefinitions(response.data);
      setError(null);
    } catch (err) {
      setError('Term not found');
      setDefinitions([]);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      message.error('Text-to-speech is not supported in this browser.');
    }
  };

  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
      <br></br>
      <Title level={1} style={{ textAlign: 'center' }}>📚 Online English Dictionary</Title>
      <Input.Search
        placeholder="🔍 Search for a term"
        enterButton={<Button type="primary" icon={<SearchOutlined />}>Search</Button>}
        size="large"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onSearch={handleSearch}
        style={{ marginBottom: '24px' }}
      />
      <div style={{ textAlign: 'center', marginTop: '24px', }}>
        <TextToSpeechButton text={term}  />
      </div>
      <Divider />

      {error && <Text type="danger">{error}</Text>}
      {definitions.length > 0 && (
        <List
          header={<Title level={4}>Definitions 📖</Title>}
          bordered
          style={{ marginTop: '24px', backgroundColor: '#ffffff', borderRadius: '8px' }}
          dataSource={definitions}
          renderItem={(item) => (
            <List.Item>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space>
                  <Text strong>{item.word}</Text>
                  {item.wordtype && <Text type="secondary">({item.wordtype})</Text>}
                </Space>
                <Text>{item.definition}</Text>
              </Space>
            </List.Item>
          )}
        />
      )}
      
      <Title level={3} style={{ marginTop: '24px' }}>
        🌟 Popular Terms (refreshing in {counter}s)
      </Title>
      <List
        bordered
        dataSource={popularTerms}
        style={{ marginTop: '24px', backgroundColor: '#ffffff', borderRadius: '8px' }}
        renderItem={(item, index) => (
          <List.Item>
            <Text>{index + 1}. {item}</Text>
          </List.Item>
        )}
      />
    </div>
  );
};

const TextToSpeechButton = ({ text }) => {
  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      message.error('Text-to-speech is not supported in this browser.');
    }
  };

  return (
    <Button
      size='large'
      type="primary"
      icon={<AudioOutlined />}
      onClick={speakText}
      disabled={!text}
    >
      Speak
    </Button>
  );
};

export default MainContent;