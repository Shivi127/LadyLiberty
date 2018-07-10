import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Welcome from './Welcome.js';
import Message from './Message.js';
import Logo from './logo.svg';
import io from 'socket.io-client'



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
            }],
            response: true,
            input:<p>{" MSG"}</p>,
            res:";"
        };

        this.submitMessage = this.submitMessage.bind(this);

       
            this.socket = io.connect('http://localhost:3000');
            this.socket.on('bot reply', function(text){
                console.log(text)});
    }



    message(text) {
        this.socket.emit('chat message', text);
        console.log('I got heree!!');
    }

    botreply(text){
        console.log('Text', text);
        this.setState({
            chats: this.state.chats.concat([{
                username: 'User',
                content: text,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        }); 
        this.state.response = true;
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
        var temp  = ReactDOM.findDOMNode(this.refs.msg).value;
        this.message(temp);
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
                    }
                        
                    
                </ul>
                {this.state.response ? false:
                            this.response()
                        }
                        
                <form className="input" onSubmit={(e) => this.submitMessageRES(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                    <button><i className="fa fa-microphone"></i></button>
                </form>
            </div>
        );
    }
}




export default Chatroom;


