import { Button, Container, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { editBook, getAllBooks } from "../modules/fetch";
import Books from "../components/Books";

const Homepage = () => {

    const [books, setBooks] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [getBookId, setGetBookId] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const fetchBooks = async () => {
            const books = await getAllBooks()
            setBooks(books)
        }
        fetchBooks()
    }, [])

    const handleEdit = async (editBook) => {
        await editBook(getBookId.id, editBook)

    }

    return (
        <Container maxW="6xl" py={10} >
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {books?.books?.map((book) => (
                    <div
                        key={`${book.id} ${book.title}`}
                        onClick={() => {
                            setGetBookId(book);
                            onOpen();
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <Books {...book} />
                    </div>
                ))}
            </SimpleGrid>

            {getBookId(
                <Modal isOpen={isOpen} onClose={onClose}>

                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Book Detail</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {isEdit ? (
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    const editBookData = {
                                        title: e.target.title.value,
                                        author: e.target.author.value,
                                        publisher: e.target.publisher.value,
                                        year: Number(e.target.year.value),
                                        pages: Number(e.target.pages.value),
                                    }
                                    handleEdit(editBookData)
                                }}>
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input type="text" />
                                    </FormControl>
                                </form>
                            ) : (<>
                                <Text>Title: {getBookId.title} </Text>
                                
                            </>

                            )}
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant='ghost'>Secondary Action</Button>
                        </ModalFooter>
                    </ModalContent>

                </Modal>
            )}
        </Container >
    )

}

export default Homepage