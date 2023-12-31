import { Box, Button, Center, Flex, FormControl, FormLabel, Heading, Image, Input, Stack, VStack, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { createBook, editBook } from '../modules/fetch'
import { useNavigate } from 'react-router-dom'

function BookForm({ bookData }) {
    const toast = useToast()
    const [selectedImage, setSelectedImage] = useState(null)
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault();

        if (!selectedImage) {
            toast({
                title: "Error",
                description: "Please select image",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        const formData = new FormData(event.target);

        if (bookData) {
            try {
                await editBook(
                    bookData.id,
                    formData.get("title"),
                    formData.get("author"),
                    formData.get("publisher"),
                    parseInt(formData.get("year")),
                    parseInt(formData.get("pages"))
                );
                toast({
                    title: "Success",
                    description: "Book edited successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                navigate("/")
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.response.data.message || "Something went wrong",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
            return;
        }

        try {
            await createBook(formData);
            event.target.reset();
            toast({
                title: "Success",
                description: "Book created successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setSelectedImage("");
            navigate("/")
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.message || "Something went wrong",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            throw new Error(error)
        }
    }

    useEffect(() => {
        if (bookData?.image) {
            setSelectedImage(`http://localhost:8000/${bookData?.image}`);
        }
    }, [bookData]);


    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="90vh"
            justifyContent="center"
            alignItems="center"
        ><Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
        >
                <Box minW={{ base: '80%', md: '468px' }}
                    h="70%" my={100}>
                    <Center m="2rem">
                        <Heading color="blue.700">{bookData ? "Edit Book" : "Create Book"}</Heading>
                    </Center>

                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input name='title' required defaultValue={bookData?.title} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Author</FormLabel>
                                <Input name="author" required defaultValue={bookData?.author} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Publisher</FormLabel>
                                <Input name="publisher" required defaultValue={bookData?.publisher} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Year</FormLabel>
                                <Input
                                    name="year"
                                    type="number"
                                    required
                                    defaultValue={bookData?.year}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Pages</FormLabel>
                                <Input
                                    name="pages"
                                    type="number"
                                    required
                                    defaultValue={bookData?.pages}
                                />
                            </FormControl>
                            {selectedImage && (
                                <Image src={selectedImage} alt="Selected Image" />
                            )}
                            {!bookData?.image && (
                                <FormControl>
                                    <FormLabel>Image</FormLabel>
                                    <Input
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setSelectedImage(URL.createObjectURL(file));
                                        }}
                                    />
                                </FormControl>
                            )}
                            <Button
                                borderRadius="xl"
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                                mt={5}
                            >
                                {bookData ? "Save" : "Create Book"}
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </Stack>
        </Flex>

    )
}

export default BookForm