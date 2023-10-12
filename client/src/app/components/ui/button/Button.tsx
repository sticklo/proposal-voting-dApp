'use client';

import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, ...props }) => {
  return <ChakraButton {...props}>{children}</ChakraButton>;
};

export default Button;
