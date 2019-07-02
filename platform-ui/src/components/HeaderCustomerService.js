import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import './css/header.css'
import getCookie from './Cookie'
import axios from 'axios'
import M from 'materialize-css'

class Header extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             li1: "FUND FINDER",
             li2: "ADD FUND",
             li3: "ADD ENTITLEMENTS",
             user: ""
        }
    }

    componentDidMount(){
        var jwt = getCookie('token');
        if(!jwt){
            this.props.history.push('/');
        }else{
            axios.get('http://localhost:8762/portfolio', {headers : { Authorization: `Bearer ${jwt}` } })
            .then( res => {
                this.setState({
                    user: res.data.userId
                })
            }).catch( err => {
                document.cookie = "";
                this.props.history.push('/');
            });
        }
    }
    
    render() {
        M.updateTextFields();
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="x.html" className="right username">{this.state.user}</a>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li onClick = {()=> this.props.tabHandler(0)}><a>{this.state.li1}</a></li>
                        <li onClick = {()=> this.props.tabHandler(1)}><a>{this.state.li2}</a></li>
                        <li onClick = {()=> this.props.tabHandler(2)}><a>{this.state.li3}</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header
