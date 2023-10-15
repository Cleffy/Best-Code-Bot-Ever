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
import { QUERY_CHAT,QUERY_USER } from '../utils/queries';

const History = () => {
    //const {loading,data } = useQuery(QUERY_USER)

    //const userData = data?.user || {}
    //console.log(userData)

    const userData =  {
            _id: "652b01a82737b3119b174929",
            username: "eric",
            history: [
                {
                    _id:"652b09612fdf8b8dd66e5268",
                    responses: [
                        {
                            responseText: "hi also",
                            username:"eric"
                        }
                    ],
                    username: "eric"
                },
              
            ]
        }
    
     userData.history.forEach(chats => {
       console.log(chats._id)
   const { data } = useQuery(QUERY_CHAT,{
        variables: {_id: chats._id }
    })
   const userChats = data?.chat || {}
    console.log(userChats)
})
    ; // no idea if this is going to work
    //console.log('data: ', data);
   // console.log('userChats: ', userChats);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

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