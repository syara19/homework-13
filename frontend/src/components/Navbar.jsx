import { Button, Flex, HStack, Text } from "@chakra-ui/react"
import useAuthStore from "../store/authStore";
import { useEffect, useState, } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true);
    }
    // setIsLoggedIn(false)
console.log(isLoggedIn)

  }, [localStorage.getItem("token")])

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="facebook.800"
      color="white"
    >
      <Link to="/">
        <Flex align="center" mr={5} pcursor="pointer">
          <Text fontSize="xl" fontWeight="bold" >
            My App
          </Text>
        </Flex>
      </Link>

      <HStack>
        {isLoggedIn&& (
          <Link to="/newbook">
            <Button colorScheme="blackAlpha">Create New Book</Button>
          </Link>
        )}
        {!isLoggedIn ? (
          <Button onClick={() => navigate("/login")} colorScheme="blue">
            Login
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </HStack>

    </Flex>
  )
}

export default Navbar