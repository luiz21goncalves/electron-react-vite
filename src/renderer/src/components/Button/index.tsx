import { ReactNode } from 'react';

import { Container } from './styles';

type ButtonProps = {
  children: ReactNode;
};

export const Button = (props: ButtonProps) => {
  const { children } = props;

  return <Container type="button">{children}</Container>;
};
