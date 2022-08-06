import React from 'react';
import {
  Input,
  View,
  VStack,
  FormControl,
  TextArea,
  Button,
  useToast,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {DialogAlert} from './components/DialogAlert';
import {FormProps, ContactApi} from './redux/store';

const DialogForm = ({navigation, route}: any) => {
  const {type, data: dataDetailContact} = route.params;
  navigation.setOptions({
    title: type === 'add' ? 'Add New Contact' : 'Edit Contact',
  });
  const toast = useToast();
  const [addContact, {isLoading: loadingAdd, isError: isErrorAdd}] =
    ContactApi.useAddContactMutation();
  const [updateContact, {isLoading: loadingUpdate, isError: isErrorupdate}] =
    ContactApi.useUpdateContactMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormProps>({
    defaultValues: {
      firstName: dataDetailContact?.firstName || '',
      lastName: dataDetailContact?.lastName || '',
      age: dataDetailContact?.age.toString() || '',
      photo: dataDetailContact?.photo || '',
    },
  });

  const handelAddContact = async (data: FormProps) => {
    const payload = {
      ...data,
      age: parseInt(data.age),
    };
    await addContact(payload);
    if (isErrorAdd) {
      toast.show({
        placement: 'top',
        render: () => {
          return <DialogAlert type="error" message="Add Contact Failed" />;
        },
      });
    } else {
      reset();
      toast.show({
        placement: 'top',
        render: () => {
          return <DialogAlert type="success" message="Add Contact Success" />;
        },
      });
      navigation.navigate('Home');
    }
  };

  const handelEditContact = async (data: FormProps) => {
    const payload = {
      id: dataDetailContact.id,
      data: {
        ...data,
        age: parseInt(data.age),
      },
    };
    await updateContact(payload);
    if (isErrorupdate) {
      toast.show({
        placement: 'top',
        render: () => {
          return <DialogAlert type="error" message="Edit Contact Failed" />;
        },
      });
    } else {
      reset();
      toast.show({
        placement: 'top',
        render: () => {
          return <DialogAlert type="success" message="Edit Contact Success" />;
        },
      });
      navigation.navigate('Home');
    }
  };

  const handleSaveData = (data: FormProps) => {
    if (type === 'add') {
      handelAddContact(data);
    }
    if (type === 'edit') {
      handelEditContact(data);
    }
  };
  return (
    <VStack style={styles.container} space={4} justifyContent="space-between">
      <VStack py={8} px={3} space={6}>
        <FormControl isInvalid={!!errors.firstName}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="firstName"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                size="lg"
                w={{
                  base: '100%',
                }}
                bgColor="#fff"
                // _focus={{
                //   borderColor: '#2196F3',
                //   color: '#2196F3',
                // }}
                borderWidth={1.5}
                placeholder="First Name"
              />
            )}
          />
          {errors.firstName && (
            <FormControl.ErrorMessage>
              Username is Required
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="lastName"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                size="lg"
                w={{
                  base: '100%',
                }}
                bgColor="#fff"
                borderWidth={1.5}
                placeholder="Last Name"
              />
            )}
          />
          {errors.lastName && (
            <FormControl.ErrorMessage>
              Last Name is Required
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.age}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="age"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                size="lg"
                w={{
                  base: '100%',
                }}
                borderWidth={1.5}
                bgColor="#fff"
                placeholder="Age"
              />
            )}
          />
          {errors.age && (
            <FormControl.ErrorMessage>Age is Required</FormControl.ErrorMessage>
          )}
        </FormControl>

        <Controller
          control={control}
          // rules={{}}
          name="photo"
          render={({field: {onChange, onBlur, value}}) => (
            <TextArea
              bgColor="#fff"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              h={20}
              placeholder="Foto Link"
            />
          )}
        />
      </VStack>
      <Button
        isLoading={type == 'add' ? loadingAdd : loadingUpdate}
        mb={5}
        onPress={handleSubmit(handleSaveData)}>
        SAVE
      </Button>
    </VStack>
  );
};

export default DialogForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
});
