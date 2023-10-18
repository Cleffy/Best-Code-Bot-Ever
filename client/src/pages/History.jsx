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
import { QUERY_USER } from '../utils/queries';

const History = () => {
    const [chats, setChats] = useState([]);
    const { loading, data } = useQuery(QUERY_USER, {
        fetchPolicy: 'network-only', // make the history page update in real time
        onCompleted: (data) => {
            setChats(data.user.history.filter((chat) => {
                return chat.responses.length > 0 // only display chats that have at least one response
            }))
        }
    });

    if (loading) { // if the page is still loading, display a loading message
        return (
            <div>
                <h1>History</h1>
                <h2>Loading...</h2>
            </div>
        );
    }

    const handleChatClick = (index) => {
        window.location.replace(`/chat/${index}`) // when a history entry is clicked, redirect the user to the chat page with the same index. for example, navigating to the first (earliest) history entry will redirect the user to /chat/0
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null; // get a token if the user is logged in; otherwise, set token to null

    if (!token) { // the if statement will only run if the user is not logged in (token = null)
        return false;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>History</Card.Title>
                            {chats.toReversed().map((chat, index) => {
                                return (
                                    <Card.Text key={index}>
                                        {/* display the chats, top to bottom, in order from most to least recent. we have to start from chats.length-1 (the end of the array) because the chats array is in order from least to most recent and the map is affected by the toReversed() function. */}
                                        <Button onClick={()=>handleChatClick(chats.length-1 - index)}>{chat.responses[0].responseText.split(" ").slice(0, 8).join(" ")}{chat.responses[0].responseText.split(" ").length >= 8 ? '...' : ''}
                                        {/* this code assumes that at least the first 8 words are separated evenly (by 7 spaces). to start, the split() function converts the first responseText string (the initial question submitted by the user) into an array of substrings separated by spaces. then the slice() function returns a copy of the array that only includes the first 8 entries (indices 0 through 7). finally, the join() function joins the individual elements of the array into a string, separating each element by the character specified by the parameter, which in this case is the space character (" "). in summary, this code takes the first 8 words of the first user query and displays the resulting string as the title for each history entry. if the query is at most 8 characters long, the entire query will be displayed as the title. */}
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
