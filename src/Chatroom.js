import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Welcome from './welcome.js';
import Message from './Message.js';
import Logo from './logo.svg';
var content ={content: <p> Helloooooo</p>};

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
            },{username: "LadyLiberty", content:content.content, img: Logo}],
            response: true,
            input:<p>{" MSG"}</p>,
            res:";"
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    checkresponse(){
        return this.state.response;
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
                username: 'User',
                content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
    }
    response(){
        //e.preventDefault();
        this.setState({
            chats: this.state.chats.concat([{
                username: 'LadyLiberty',
                content:this.state.input,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
        this.state.response = true;
    }

    submitMessageRES(e) {
        this.state.response = false;
        var con = <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>;
        this.state.input = con;
        e.preventDefault();
        this.setState({
            chats: this.state.chats.concat([{
                username: 'User',
                content: con,
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
                <h3>LadyLiberty</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat) => 
                            <Message chat={chat} user={username} />
                        )
                    }{this.state.response ? false:
                            this.response()
                        }
                        
                    
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessageRES(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}


export default Chatroom;


