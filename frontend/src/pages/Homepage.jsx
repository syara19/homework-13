import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {  getAllBooks} from "../modules/fetch";
import Books from "../components/Books";

const Homepage = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            const books = await getAllBooks()
            setBooks(books)
        }
        fetchBooks()
    }, [])



    return (
        <Container maxW="6xl" py={10} >
            <Grid gap={7} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {books?.books?.map((book) => (
                    <GridItem
                        key={`${book.id} ${book.title}`}
                        style={{ cursor: "pointer" }}
                    >
                        <Books {...book} />
                    </GridItem>
                ))}
            </Grid>
        </Container >
    )

}

export default Homepage