import {Alert, HStack, VStack, Text} from 'native-base';
import React from 'react';

export const DialogAlert = ({
  type,
  message,
}: {
  type: string;
  message: string;
}) => {
  return (
    <Alert style={{zIndex: 9999}} mb="3" w="100%" status={type}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {message}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};
