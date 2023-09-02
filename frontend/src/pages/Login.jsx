import { Box, Button, Center, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { loginUser } from "../modules/fetch"
import { useNavigate } from "react-router-dom"



const Login = () => {
    const navigate = useNavigate()

    // const [isLogin,setIsLogin] = useState(false)

    useEffect(() => {
        const token = window.localStorage.getItem("token")

        if (token) console.log("success")

    }, [window.localStorage.getItem("token")])


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { token } = await loginUser(
                e.target.email.value,
                e.target.password.value
            )
            window.localStorage.setItem("token", token)
            navigate("/")
        } catch (error) {
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
                boxShadow='2xl'
                rounded="xl"
                p={6}>
                <Center fontSize="3xl" fontWeight="bold" mb={5} color="blue.800">Login</Center>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={5}>
                        <FormControl>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <Input type="email" name="email" placeholder="Enter email" required />
                            <FormLabel>
                                Email
                            </FormLabel>
                            <Input type="password" name="password" placeholder="Enter password" required />
                        </FormControl>
                    </VStack>

                    <Button type="submit" w="100%">Login</Button>
                </form>
            </Box>
        </Box>
    )
}

export default Login