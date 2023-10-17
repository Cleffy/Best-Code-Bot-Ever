import React, { useState } from "react";
import {
    Container,
    Col,
    Button,
    Card,
    Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_CHAT,QUERY_USER } from '../utils/queries';

const History = () => {
    const [chats, setChats] = useState([])
    const {loading,data } = useQuery(QUERY_USER, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setChats(data.user.history.filter((chat) => {
                return chat.responses.length > 0
            }))
        }
    })

    const handleChatClick = (index) => {
        window.location.replace(`/chat/${index}`)
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>History</Card.Title>
                            {chats.map((chat, index) => {
                                return (
                                    <Card.Text key={index}>
                                        <Button onClick={()=>handleChatClick(index)}>{chat.responses[0].responseText.split(" ").slice(0, 5).join(" ")}...
                                        {/* this code assumes that at least the first 5 words are separated evenly (by 4 spaces). to start, the split() function converts the first responseText string (the initial question submitted by the user) into an array of substrings separated by spaces. then the slice() function truncates that array down to the first 5 entries (indices 0 through 4). finally, the join() function joins the individual elements of the array into a string, separating each element by the character specified by the parameter, which in this case is the space character (" "). in summary, this code takes the first 5 words of the first user query and uses the resulting string as the title for each history entry. */}
                                        <br></br>
                                        {/* put the date and time the chat was created on a different line from its title */}
                                        {chat.createdOn}</Button>
                                    </Card.Text>
                                )
                            })}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default History;
