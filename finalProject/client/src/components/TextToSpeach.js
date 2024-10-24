
import { Button, message } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

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

  export default TextToSpeechButton;