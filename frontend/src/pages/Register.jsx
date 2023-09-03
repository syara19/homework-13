import { useState } from "react"
import { registerUser } from "../modules/fetch"
import { Link, useNavigate } from "react-router-dom"
import { Box, Button, Center, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, VStack, useToast } from "@chakra-ui/react"



const Register = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return
        }
        try {
            await registerUser(
                e.target.name.value,
                e.target.email.value,
                password
            )
            toast({
                title: "Registered",
                description: "You have successfully registered.",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            navigate("/login")
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: error?.message || "An error occurred. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            throw new Error

        }
    }

    return (
        <>
            <Box
                display="grid"
                placeContent="center"
                position="absolute"
                w="100vw"
                h="100vh" top="0"
            >
                <Box w="400px"
                    boxShadow='2xl'
                    rounded="xl"
                    p={6}>
                    <Center fontSize="3xl" fontWeight="bold" mb={8} color="blue.700">Register</Center>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={2}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    id="field-unique-id-4"
                                    name="name"
                                    required
                                    type="text"
                                    placeholder="Enter your name"
                                />
                                <FormLabel mt="1.5rem">Email</FormLabel>
                                <Input
                                    id="field-unique-id-2"
                                    name="email"
                                    required
                                    type="email"
                                    placeholder="Enter your email" />
                                <FormLabel mt="1.5rem">Password</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        id="field-unique-id-3"
                                        pr='4.5rem'
                                        name="password"
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <InputRightElement width="3rem">
                                        <Button size="sm" onClick={handleShowPassword}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                                <FormLabel mt="1.5rem">Confirm Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        id="field-unique-id-5"
                                        name="confirm-password"
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <InputRightElement width="3rem">
                                        <Button size="sm" onClick={handleShowPassword}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                            </FormControl>
                            <Button
                                type="submit"
                                colorScheme="messenger"
                                mt={8}
                                loadingText="Registering"
                                w="100%"
                            >
                                Register
                            </Button>
                            <Text textAlign="center" mt={3}>
                                Have an account? <Text as={Link} to="/login" color="blue.800">Login</Text>
                            </Text>
                        </VStack>



                    </form>
                </Box >
            </Box >
        </>
    )
}

export default Register