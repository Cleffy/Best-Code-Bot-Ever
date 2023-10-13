import React from "react";
import {
    Container,
    Col,
    Button,
    Card,
    Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_CHAT } from '../utils/queries';

const { loading, data } = useQuery(QUERY_CHAT);
const userChats = data?.userChats || {}; // no idea if this is going to work
console.log('data: ', data);
console.log('userChats: ', userChats);

const History = () => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>History</Card.Title>
                            <Card.Text>
                                <Button>
                                    Chat 1
                                </Button>
                            </Card.Text>
                            <Card.Text>
                                <Button>
                                    Chat 2
                                </Button>
                            </Card.Text>
                            <Card.Text>
                                <Button>
                                    Chat 3
                                </Button>
                            </Card.Text>
                            <Card.Text>
                                <Button>
                                    Chat 4
                                </Button>
                            </Card.Text>
                            <Card.Text>
                                <Button>
                                    Chat 5
                                </Button>
                            </Card.Text>
                            <Card.Text>
                                <Button>
                                    Chat 6
                                </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default History;