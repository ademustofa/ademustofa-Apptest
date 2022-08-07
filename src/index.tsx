import React, {useState, useRef, useMemo, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  Text,
  Box,
  VStack,
  Heading,
  FlatList,
  Avatar,
  HStack,
  Spacer,
  Center,
  Fab,
  Icon,
  Pressable,
  Actionsheet,
  useToast,
  AlertDialog,
  Button,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ContactApi, Contact, FormProps} from './redux/store';
import {DialogAlert} from './components/DialogAlert';
import {getRandomColor} from './utils';
import SkeletonPage from './components/Skeleton';

const HomePage = ({navigation}: any) => {
  const toast = useToast();
  const cancelRef = useRef(null);

  const {data: contact, isLoading} = ContactApi.useGetContactQuery({
    fixedCacheKey: 'shared-update-post',
  });
  const [
    deleteContact,
    statusDelete,
    // {isError: isErrorDelete, isLoading: isLoadingDelete, data: dataDelete},
  ] = ContactApi.useDeleteContactMutation({
    fixedCacheKey: 'shared-update-post',
  });

  const [openContact, setOpenContact] = useState<boolean>(false);
  const [dataContact, setDataContact] = useState<Contact | null>(null);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);

  const handleOpenContact = (data: any) => {
    setDataContact(data);
    setOpenContact(true);
  };

  const handleEdit = () => {
    setOpenContact(false);
    navigation.navigate('FormContact', {
      type: 'edit',
      data: dataContact,
    });
  };

  const handleDeleteContact = async () => {
    const payload = {
      id: dataContact?.id,
    };
    await deleteContact(payload);
    console.log(statusDelete);
    if (statusDelete.isError) {
      toast.show({
        placement: 'top',
        render: () => {
          return <DialogAlert type="error" message="Delete Contact Failed" />;
        },
      });
    } else {
      setOpenContact(false);
      setDataContact(null);
      setOpenAlertDialog(false);
      toast.show({
        placement: 'top',
        render: () => {
          return (
            <DialogAlert type="success" message="Delete Contact Success" />
          );
        },
      });
    }
  };

  const RenderContact = useMemo(
    () => (
      <FlatList
        mb={10}
        data={contact?.data}
        renderItem={({item}: any) => (
          <Pressable onPress={() => handleOpenContact(item)}>
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: 'gray.600',
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="3">
              <HStack space={3} justifyContent="space-between">
                <Avatar
                  bg={getRandomColor()}
                  mr="1"
                  source={{
                    uri: 'https://bit.ly/broken-link',
                  }}>
                  {item.firstName.charAt(0).toUpperCase()}
                </Avatar>
                <VStack>
                  <Text
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    bold>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    Age : {item.age}
                  </Text>
                </VStack>
                <Spacer />
              </HStack>
            </Box>
          </Pressable>
        )}
        keyExtractor={(item: Contact) => item.id}
      />
    ),
    [contact],
  );

  return (
    <Box flex={1}>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={openAlertDialog}
        onClose={() => setOpenAlertDialog(false)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Contact</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure want delete this contact ?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => {
                  setOpenAlertDialog(false);
                  setOpenContact(true);
                }}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button
                isLoading={statusDelete.isLoading}
                colorScheme="danger"
                onPress={handleDeleteContact}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <Actionsheet isOpen={openContact} onClose={() => setOpenContact(false)}>
        <Actionsheet.Content>
          <Center w="100%" py={10}>
            <VStack space={5} justifyContent="center" alignItems="center">
              <Avatar
                bg="primary.500"
                mr="1"
                size="lg"
                source={{
                  uri: 'https://bit.ly/broken-link',
                }}>
                {dataContact?.firstName.charAt(0).toUpperCase()}
              </Avatar>
              <Text bold fontSize="md">
                {dataContact?.firstName} {dataContact?.lastName}
              </Text>
            </VStack>
          </Center>

          <Actionsheet.Item
            onPress={handleEdit}
            startIcon={
              <Icon
                as={MaterialCommunityIcons}
                color="green.500"
                mr="1"
                size="6"
                name="account-edit"
              />
            }>
            Update Contact
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setOpenContact(false);
              setOpenAlertDialog(true);
            }}
            startIcon={
              <Icon
                as={MaterialCommunityIcons}
                color="red.500"
                mr="1"
                size="6"
                name="delete"
              />
            }>
            Delete Contact
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      <Heading fontSize="xl" p="4" pb="3">
        Contact
      </Heading>

      {/* Render Data List */}
      {/* <SkeletonPage /> */}
      {isLoading ? <SkeletonPage /> : RenderContact}

      <Fab
        renderInPortal={false}
        onPress={() =>
          navigation.navigate('FormContact', {type: 'add', data: null})
        }
        shadow={2}
        icon={<Icon color="white" as={AntDesign} name="plus" size="lg" />}
      />
    </Box>
  );
};

export default HomePage;
