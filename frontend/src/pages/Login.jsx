import { Box, Link, Button, Center, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { loginUser } from "../modules/fetch"
import { useNavigate } from "react-router-dom"
import useAuthStore from '../store/authStore';



const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setIsLoggedIn } = useAuthStore()
    const toast = useToast()

    useEffect(() => {
        const token = window.localStorage.getItem("token")

        if (token) {
            setIsLoggedIn(true)
            navigate("/")
        }
    }, [setIsLoggedIn, navigate])

    const handleShowPassword = () => setShowPassword(!showPassword)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { token } = await loginUser(email, password)
            localStorage.setItem("token", token)
            setIsLoggedIn(true)
            toast({
                title: 'Logged in',
                description: 'You have successfully logged in.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            navigate("/")
        } catch (error) {
            toast({
                title: 'An error occurred.',
                description: error?.message || "An error occurred. Please try again.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            throw new Error(error)
        }
    }

    return (
        <Box display="grid"
            placeContent="center"
            position="absolute"
            w="100vw"
            h="100vh" top="0"
        >
            <Box w="400px"
                boxShadow='dark-lg'
                rounded="xl"
                p={6}>
                <Center fontSize="3xl" fontWeight="bold" mb={5} color="blue.700">Login</Center>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={5}>
                        <FormControl>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <Input type="email" id="field-unique-id-1" name="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
                            <FormLabel mt="1.5rem">Password</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    name="password"
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputRightElement width="3rem">
                                    <Button size="sm" onClick={handleShowPassword}>
                                        {showPassword ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </VStack>
                    <Button mt="3.5rem" type="submit"
                        colorScheme="messenger"
                        w="100%">Login</Button>
                </form>
                <Box mt="2rem">
                    New to us?{' '}
                    <Link color="teal.500" onClick={() => {
                        navigate('/register')
                    }}>
                        Doesn't Have Account? Click here
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Login