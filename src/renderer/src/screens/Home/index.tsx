import { useState } from 'react';

import { Button } from '../../components/Button';
import { Container } from './styles';

export const Home = () => {
  const [receivedMessage, setReceivedMessage] = useState('Olá');

  window.Main.on('message-replay', setReceivedMessage);

  return (
    <Container>
      <h1>{receivedMessage}</h1>
      <Button>Send Message</Button>
    </Container>
  );
};
