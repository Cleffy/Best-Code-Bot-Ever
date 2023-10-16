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

    console.log(chats)

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
                                        <Button onClick={()=>handleChatClick(index)}>{chat.createdOn}</Button>
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
