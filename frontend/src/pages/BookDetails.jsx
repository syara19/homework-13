import { Box, Button, Center, HStack, Heading, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { deleteBook, getBookDetail } from "../modules/fetch";
import { Link, useNavigate, useParams } from "react-router-dom";

function BookDetails() {
    const [book, setBook] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate();
    const isLogin = localStorage.getItem("token")

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await getBookDetail(id);
                setBook(response.book);
            } catch (error) {
                throw new Error(error)
            }
        };
        fetchBook();
    }, [id]);

    const handleDeleteBook = async () => {
        try {
            await deleteBook(id);
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Box
            display="grid"
            placeContent="center"
            position="absolute"
            w="100vw"
            h="100vh" top="0">
            <Box
                w="500px"
                boxShadow='dark-lg' 
                rounded="lg"
                p={6}
            >
                <Center mt="3rem">
                    <Heading fontSize="2xl" fontWeight="bold" color="blackAlpha.700">{book?.title}</Heading>
                </Center>
                <Center mt="2rem" mb="2rem">
                    <Image src={`http://localhost:8000/${book?.image}`} alt="img" />
                </Center>
                <Text m="0.5rem">Title: {book?.title}</Text>
                <Text m="0.5rem">Author: {book?.author}</Text>
                <Text m="0.5rem">Publisher: {book?.publisher}</Text>
                <Text m="0.5rem">Year: {book?.year}</Text>
                <Text m="0.5rem">Pages: {book?.pages}</Text>

                {isLogin && (
                    <HStack mt="2rem" mb="3rem">
                        <Link to={`/editbook/${id}`}>
                            <Button colorScheme="teal">Edit</Button>
                        </Link>
                        <Popover>
                            <PopoverTrigger>
                                <Button colorScheme="red">Delete</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Confirmation!</PopoverHeader>
                                <PopoverBody>
                                    Are you sure you want to delete this book?
                                </PopoverBody>
                                <Button onClick={handleDeleteBook} colorScheme="red">
                                    Delete
                                </Button>
                            </PopoverContent>
                        </Popover>

                    </HStack>
                )}
            </Box>
        </Box>
    )
}

export default BookDetails