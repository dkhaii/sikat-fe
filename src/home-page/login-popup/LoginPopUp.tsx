import React from 'react';
import './LoginPopUp.css';
import moLogo from '/mo-logo.png';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useAuth } from '../../common/services/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../components/common/loading-modal/LoadingModal';

type LoginPopUpProps = {
  isOpen: boolean;
  onClose: () => void;
};

type LoginFormProps = {
  id: string;
  password: string;
};

const LoginPopUp = ({ isOpen, onClose }: LoginPopUpProps) => {
  const { login, isLoginLoading } = useAuth();
  const navigate = useNavigate();

  const formIntialValues: LoginFormProps = {
    id: '',
    password: '',
  };

  const formik = useFormik({
    initialValues: formIntialValues,
    onSubmit: async () => {
      const { id, password } = formik.values;
      // console.log(id, password);

      try {
        await login(id, password);
        navigate('/leave-plans');
      } catch (error) {
        console.log(error);
      }

      formik.setFieldValue('id', '');
      formik.setFieldValue('password', '');
    },
  });

  const handleFormInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={'0rem'}>
        {isLoginLoading ? (
          <LoadingModal isLoading={isLoginLoading} onClose={() => {}} />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <ModalCloseButton />
            <ModalHeader
              display={'flex'}
              justifyContent={'center'}
              marginTop={'2rem'}
            >
              <div className="login-logo-container">
                <img src={moLogo} alt="moLogo" />
              </div>
            </ModalHeader>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Badge Number</FormLabel>
                <Input
                  variant="filled"
                  borderRadius={'.2rem'}
                  name="id"
                  onChange={handleFormInput}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  variant="filled"
                  borderRadius={'.2rem'}
                  type="password"
                  name="password"
                  onChange={handleFormInput}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter display={'flex'} justifyContent={'center'}>
              <Button
                backgroundColor={'#212529'}
                color={'#fff'}
                paddingLeft={'2rem'}
                paddingRight={'2rem'}
                borderRadius={'.2rem'}
                type="submit"
              >
                LOGIN
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LoginPopUp;
