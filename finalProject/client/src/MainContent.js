import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, message, Space, Divider, Spin, List } from 'antd';
import DefinitionList from './components/DefinitionList';
import GenerateTextForm from './components/GenerateTextForm';
import SearchForm from './components/SearchForm';
import TextToSpeechButton from './components/TextToSpeach';


const { Title, Text } = Typography;

const MainContent = () => {
  const [term, setTerm] = useState('');
  const [definitions, setDefinitions] = useState([]);
  const [popularTerms, setPopularTerms] = useState([]);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(25);
  const [generatedText, setGeneratedText] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false); 
  const [hasMoreDefinitions, setHasMoreDefinitions] = useState(true);
  const [definitionPage, setDefinitionPage] = useState(1); 
  useEffect(() => {
    const fetchPopularTerms = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/popular');
        const data = await response.json();
        setPopularTerms(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch popular terms');
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
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/api/search?term=${term}&page=1`);
      const data = await response.json();
      setCustomPrompt(`From where this word ${term} come from?`);
      setDefinitions(data);
      setError(null);
      setHasMoreDefinitions(data.length === 10); 
      setLoading(false);
    } catch (err) {
      message.error('term not found');
      setDefinitions([]);
      setError('Failed to fetch definitions');
      setLoading(false);
    }
  };

  const handleGenerateText = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: customPrompt + ' ' + term,
        }),
      });
      const data = await response.json();
      setGeneratedText(data.generatedText || 'No answer provided');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching generated text:', error);
      message.error('Failed to generate text');
      setError('Failed to generate text');
      setLoading(false);
    }
  };

  const handleScroll = async (e) => {
    if (hasMoreDefinitions && e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
      setLoading(true);
      try {
        const nextPage = definitionPage + 1;
        const response = await fetch(`http://localhost:5001/api/search?term=${term}&page=${nextPage}`);
        const data = await response.json();
        setDefinitions([...definitions, ...data]);
        setDefinitionPage(nextPage);
        setHasMoreDefinitions(data.length === 10);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching more definitions:', error);
        message.error('Failed to fetch more definitions');
        setError('Failed to fetch more definitions');
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
      <SearchForm
        term={term}
        onSearch={handleSearch}
        onChange={(e) => setTerm(e.target.value)}
      />
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <TextToSpeechButton text={term} />
      </div>

      {error && <Text type="danger" style={{ color: '#f1c40f' }}>{error}</Text>}
      {definitions.length > 0 && (
        <DefinitionList
          definitions={definitions}
          onScroll={handleScroll}
          loading={loading}
        />
      )}

      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={12} style={{marginTop: '10px'}}>
          <Title level={3} style={{ color: '#3498db' }}> Use or Generate Text with Custom Prompt 💬</Title>
          <GenerateTextForm
            customPrompt={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onClick={handleGenerateText}
            loading={loading}
          />

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

export default MainContent;