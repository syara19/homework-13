import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const Books = ({ id, title, author, image, }) => {
    return (
        <Link to={`/books/${id}`}>
            <Card borderBottomRadius="xl" overflow="auto" minHeight={300} key={id}>
                <Image borderTopRadius="xl"
                    src={`http://localhost:8000/${image}`}
                    alt="image"
                    aspectRatio={16 / 9}
                    objectFit="cover"
                />
                <CardBody my={5} mx={2} p="2" >
                    <Text fontSize="sm" >{author}</Text>
                    <Heading fontSize="xl">{title}</Heading>
                </CardBody>
            </Card>
        </Link>
    )
}

export default Books