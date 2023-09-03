import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Container, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { editBook, getAllBooks, deleteBook } from "../modules/fetch";
import Books from "../components/Books";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

    const [books, setBooks] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [getBookId, setGetBookId] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isAuth = localStorage.getItem("token") ? true : false
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBooks = async () => {
            const books = await getAllBooks()
            setBooks(books)
        }
        fetchBooks()
    }, [])

    const handleEdit = async (editBookData) => {
        const data = await editBook(getBookId.id, editBookData)
        console.log(data)
        onClose()
        navigate(0);
    }

    const disableEdit = () => setIsEdit(false)

    const handleDelete = async () => {
        await deleteBook(getBookId.id)
        const updateBook = await getAllBooks()
        setBooks(updateBook)
        setGetBookId(null)
        onClose()
        navigate(0);

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

            {getBookId && (
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
                                    console.log(editBookData)
                                }}>
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input type="text" defaultValue={getBookId.title} name="title" />

                                        <FormLabel>Author</FormLabel>
                                        <Input type="text" defaultValue={getBookId.author} name="author" />
                                        <FormLabel>Publisher</FormLabel>
                                        <Input type="text" defaultValue={getBookId.publisher} name="publisher" />
                                        <FormLabel>Year</FormLabel>
                                        <Input type="text" defaultValue={getBookId.year} name="year" />
                                        <FormLabel>Pages</FormLabel>
                                        <Input type="text" defaultValue={getBookId.pages} name="pages" />
                                        <Button type="submit" colorScheme="green" >Save</Button>
                                        <Button colorScheme="gray" onClick={disableEdit}>Cancel</Button>

                                    </FormControl>
                                </form>
                            ) : (
                                <>
                                    <Text>Title: {getBookId.title} </Text>
                                    <Text>Author: {getBookId.author} </Text>
                                    <Text>Publisher: {getBookId.publisher} </Text>
                                    <Text>Year: {getBookId.year} </Text>
                                    <Text>Pages: {getBookId.pages} </Text>

                                </>

                            )}
                        </ModalBody>

                        <ModalFooter>
                            {isAuth && (
                                <Button
                                    colorScheme="yellow"
                                    mr={3}
                                    my={5}
                                    onClick={() => setIsEdit(true)}
                                >
                                    Edit
                                </Button>
                            )}

                            {/* {isAuth && (
                                <Button colorScheme="red" onClick={onOpen} my={5}>
                                    Delete
                                </Button>
                            )} */}
                        </ModalFooter>
                    </ModalContent>

                </Modal>
            )}

            {/* {getBookId && (
                <AlertDialog isOpen={isOpen} onClose={onClose}>
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader>Delete Book</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure you want to delete this book?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme="red" onClick={handleDelete}>
                                Delete
                            </Button>
                            <Button colorScheme="gray" onClick={onclose} ml={3}>
                                Cancel
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )} */}
        </Container >
    )

}

export default Homepage