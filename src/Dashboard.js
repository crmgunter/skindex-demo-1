import React, {Component} from 'react'
import {Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const DashboardHeaderContent = styled.div`
    margin: 20px auto;
    border: 1px solid lightseagreen;
    border-radius: 10px;
    padding: 20px;
    width: 75vw;
    background: #EEEEEE;
`;

export default class Dashboard extends Component {
    render() {
        return (
            <DashboardHeaderContent>
                <Container>
                    <Row>
                        <Col sm="6">
                            <div>
                                <img src="https://www.fillmurray.com/200/300" alt="bill" />
                            </div>
                        </Col>
                        <Col sm="6">
                            <Row>
                                Welcome back, Bill Murray!
                        </Row>
                            <Row>
                                Next Payment Due: $187.23
                        </Row>
                            <Row>
                                Next Payment Due On: September 1, 2019
                        </Row>
                            <Row>
                                <Link to="edit-account">Edit Account Information</Link>
                            </Row>
                            <Row>
                                <Link to="analyzer">Analyze your face</Link>
                            </Row>
                            <Row>
                                <Link to="super-secret-camera">Analyze your face with my super secret Camera</Link>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </DashboardHeaderContent>
        )
    }
}
