import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, List, Typography, message, Space, Divider, Spin, Row, Col } from 'antd';
import { AudioOutlined, SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MainContent = () => {
  const [term, setTerm] = useState('');
  const [definitions, setDefinitions] = useState([]);
  const [popularTerms, setPopularTerms] = useState([]);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(25);
  const [generatedText, setGeneratedText] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [hasMoreDefinitions, setHasMoreDefinitions] = useState(true); // New state to track if there are more definitions
  const [definitionPage, setDefinitionPage] = useState(1); // New state to track the current page of definitions

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
      const response = await axios.get(`http://localhost:5001/api/search?term=${term}&page=1`);
      setCustomPrompt(`From where this word ${term} come from?`);
      setDefinitions(response.data);
      setError(null);
      setHasMoreDefinitions(response.data.length === 10); // Check if there are more definitions
    } catch (err) {
      message.error('term not found');
      setDefinitions([]);
    }
  };

  const handleGenerateText = async () => {
    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:5001/api/generate-text', {
        prompt: customPrompt + ' ' + term,
      });
      setGeneratedText(response.data.generatedText || 'No answer provided');
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching generated text:', error);
      message.error('Failed to generate text');
      setLoading(false); 
    }
  };

  // const speakText = (text) => {
  //   if ('speechSynthesis' in window) {
  //     const utterance = new SpeechSynthesisUtterance(text);
  //     window.speechSynthesis.speak(utterance);
  //   } else {
  //     message.error('Text-to-speech is not supported in this browser.');
  //   }
  // };

  const handleScroll = async (e) => {
    if (hasMoreDefinitions && e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
      setLoading(true); 
      try {
        const nextPage = definitionPage + 1;
        const response = await axios.get(`http://localhost:5001/api/search?term=${term}&page=${nextPage}`);
        setDefinitions([...definitions, ...response.data]);
        setDefinitionPage(nextPage);
        setHasMoreDefinitions(response.data.length === 10); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching more definitions:', error);
        message.error('Failed to fetch more definitions');
        setLoading(false); 
      }
    }
  };

  return (
    <div style={{
      padding: '50px',
      backgroundColor: '#f0f2f5', 
      borderRadius: '8px'
    }}>
      <br />
      <Title level={1} style={{ textAlign: 'center', color: '#3498db' }}>📚 Online English Dictionary</Title>
      <Input.Search
        placeholder="🔍 Search for a term"
        enterButton={<Button type="primary" icon={<SearchOutlined />} style={{ backgroundColor: '#3498db', borderColor: '#3498db' }}>Search</Button>}
        size="large"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onSearch={handleSearch}
        style={{ marginBottom: '24px' }}
      />
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <TextToSpeechButton text={term} />
      </div>

      {error && <Text type="danger" style={{ color: '#f1c40f' }}>{error}</Text>}
      {definitions.length > 0 && (
        <List
          header={<Title level={4} style={{ color: '#3498db' }}>Definitions 📖</Title>}
          bordered
          style={{
            marginTop: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            overflowY: 'auto',
            maxHeight: '300px'
          }}
          onScroll={handleScroll}
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
      )}

      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={12} style={{marginTop: '10px'}}>
          <Title level={3} style={{ color: '#3498db' }}> Use or Generate Text with Custom Prompt 💬</Title>
          <Input
            placeholder={customPrompt ? customPrompt : `From where this word ${term} come from?`}
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <Button
            type="primary"
            onClick={handleGenerateText}
            style={{ backgroundColor: 'green', color: 'white' }}
          >
            {loading ? <Spin size="small"  /> : 'Generate Text'}
          </Button>

          {generatedText && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #3498db'
            }}>
              <Title level={4} style={{ color: '#3498db' }}>Generated Text</Title>
              <Text style={{ color: '#333' }}>{generatedText}</Text>
            </div>
          )}
        </Col>
        <Col span={12}>
          <Title level={3} style={{ color: '#3498db' }}>🌟 Popular Terms (refreshing in {counter}s)</Title>
          <List
            bordered
            dataSource={popularTerms}
            style={{
              marginTop: '24px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #3498db'
            }}
            renderItem={(item, index) => (
              <List.Item>
                <Text style={{ color: '#333' }}>{index + 1}. {item}</Text>
              </List.Item>
            )}
          />
        </Col>
      </Row>
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