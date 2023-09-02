import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react"


const Books = ({ id, title, author, image, }) => {
    return (
        
            <Card key={id}>
                <Image 
                src={`http://localhost:8000/${image}`} 
                alt="https://via.placeholder.com/1920x1080/eee?text=%20%E2%80%8"
                aspectRatio={16/9}
                objectFit="cover"
                />
                <CardBody >
                    <Text>{author}</Text>
                    <Heading>{title}</Heading>
                </CardBody>
            </Card>

    )
}

export default Books