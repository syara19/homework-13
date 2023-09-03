import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import BookForm from '../components/BookForm'
import { useParams } from 'react-router-dom'
import { getBookDetail } from '../modules/fetch'

const EditBook = () => {
    const { id } = useParams()
    const [book, setBook] = useState(null)

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await getBookDetail(id)
                setBook(response.book)
            } catch (error) {
                throw new Error(error)
            }
        }
        fetchBook()
            , [id]
    })

    return (
        <Box>
            <BookForm bookData={book} />
        </Box>
    )
}

export default EditBook