import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
//import Welcome from './Welcome.js';
import Message from './Message.js';
//import Logo from './logo.svg';
import Logo from './lmicon.jpg';

class Chatroom extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            chats: [{
                username: "LadyLiberty",
                content: <p>Hello I'm LadyLiberty, here to help you with all your 
                            Liberty Mutual Insurance Questions. What can I help you
                            with today?</p>,
                img: Logo,
            }, {
                username: "User",
                content: <p>Hello World!</p>,
                img: Logo,
            }]
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    componentDidMount() {
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();

        this.setState({
            chats: this.state.chats.concat([{
                username: "User",
                content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
    }

    render() {
        const username = "User";
        const { chats } = this.state;

        return (
            <div className="chatroom">
                <h3>Support</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat) => 
                            <Message chat={chat} user={username} />
                        )
                    }
                    
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                    <button><i className="fa fa-microphone"></i></button>
                </form>
            </div>
        );
    }
}

export default Chatroom;