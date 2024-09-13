import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <Flex
      height="200px"
      alignItems="center"
      justifyContent="center"
      flexDirection={'column'}
    >
      <Spinner size="xl" />
      <h1>Loading...</h1>
    </Flex>
  );
};

export default LoadingSpinner;
