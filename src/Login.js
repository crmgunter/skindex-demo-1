import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const FormStyles = styled.div`
    width: 75vw;
    margin: 20px auto;
`

export default class Login extends Component {
    render() {
        return (
            <FormStyles>
                <Form action="POST">
                    <FormGroup>
                        <Label htmlFor="">Username</Label>
                        <Input type="text"/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="">Password</Label>
                        <Input type="text"/>
                    </FormGroup>
                    <Link to="/dashboard"><Button>Log in</Button></Link>
                </Form>
            </FormStyles>
        )
    }
}
