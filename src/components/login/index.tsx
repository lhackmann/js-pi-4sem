import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';
  import api from '../../helpers/axios';
import { useState } from 'react';

  export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    
    const handleSignIn = async () => {
      try {
        const response = await api.post('/auth/login', { email, senha })
        if (response.status === 200) {
          // Assuming the API returns a token or some kind of user information
          // Save the token or user info to localStorage or context/state
          localStorage.setItem('token', response.data.token)

          // Navigate to the main page
          navigate('/main')
        } else {
          alert('Login failed. Please check your credentials and try again.')
        }
      } catch (error) {
        console.error('Error during sign in:', error)
        alert('An error occurred. Please try again later.')
      }
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        backgroundImage={
          'url(src/assets/truck.jpg)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              para conhecer todas nossas <Link href='/about' color={'blue.400'}>características</Link> 
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input 
                  type="senha" 
                  value={senha} 
                  onChange={(e) => setSenha(e.target.value)} 
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSignIn}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }