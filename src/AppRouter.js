import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Login';
import Dashboard from './Dashboard';
import Header from './Header';
import AccountForm from './AccountForm';
import FaceAnalyzer from './FaceAnalyzer';
import CustomCamera from './CustomCamera';

export default class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/edit-account" component={AccountForm} />
                    <Route path="/analyzer" component={FaceAnalyzer} />
                    <Route path="/super-secret-camera" component={CustomCamera} />
                </Switch>

            </Router>
        )
    }
};
