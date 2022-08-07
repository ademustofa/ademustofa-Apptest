import React from 'react';
import {View, HStack, Divider, Box, Skeleton} from 'native-base';

const SkeletonPage = () => {
  return (
    <>
    <Box>
      <HStack p={3} space={2}>
        <Skeleton
          // borderWidth="1"
          // borderColor="coolGray.200"
          // endColor="warmGray.50"
          size="16"
          rounded="full"
        />
        <Skeleton.Text lines={2} pt={3} />
      </HStack>
     <Divider bg="muted.200" />
    </Box>
    <Box>
      <HStack p={3} space={2}>
        <Skeleton
          // borderWidth="1"
          // borderColor="coolGray.200"
          // endColor="warmGray.50"
          size="16"
          rounded="full"
        />
        <Skeleton.Text lines={2} pt={3} />
      </HStack>
      <Divider bg="muted.200" />
    </Box>
    <Box>
      <HStack p={3} space={2}>
        <Skeleton
          // borderWidth="1"
          // borderColor="coolGray.200"
          // endColor="warmGray.50"
          size="16"
          rounded="full"
        />
        <Skeleton.Text lines={2} pt={3} />
      </HStack>
     <Divider bg="muted.200" />
    </Box>
    <Box>
      <HStack p={3} space={2}>
        <Skeleton
          // borderWidth="1"
          // borderColor="coolGray.200"
          // endColor="warmGray.50"
          size="16"
          rounded="full"
        />
        <Skeleton.Text lines={2} pt={3} />
      </HStack>
     <Divider bg="muted.200" />
    </Box>
    <Box>
      <HStack p={3} space={2}>
        <Skeleton
          // borderWidth="1"
          // borderColor="coolGray.200"
          // endColor="warmGray.50"
          size="16"
          rounded="full"
        />
        <Skeleton.Text lines={2} pt={3} />
      </HStack>
     <Divider bg="muted.200" />
    </Box>
    <Box>
      <HStack p={3} space={2}>
        <Skeleton
          // borderWidth="1"
          // borderColor="coolGray.200"
          // endColor="warmGray.50"
          size="16"
          rounded="full"
        />
        <Skeleton.Text lines={2} pt={3} />
      </HStack>
     <Divider bg="muted.200" />
    </Box>
    </>
  );
};

export default SkeletonPage;
