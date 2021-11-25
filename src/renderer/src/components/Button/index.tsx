import { ReactNode } from 'react';

import { Container } from './styles';

type ButtonProps = {
  children: ReactNode;
};

export const Button = (props: ButtonProps) => {
  const { children } = props;

  return (
    <Container
      type="button"
      onClick={() => {
        window.Main.sendMessage('Greetings!');
        console.log('Check main process log in terminal.');
      }}
    >
      {children}
    </Container>
  );
};
