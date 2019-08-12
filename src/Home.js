import React, { Component } from 'react';
import './App.css';
import API from './API'
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel2';
import Notifications, { notify } from 'react-notify-toast';
import Header from './Header';
import Body from './Body';

class Home extends Component {
    constructor(props) {
        super(props);
      
    }
    state = {
        data: [],
        fun: [],
        games: [],
        expertise: '',
        server: [],
        lobby: [],
        user: [],
        loading: false,
    }

    
    componentWillMount() {
        let _this = this;
        axios.get(API.url)
            .then(function (response) {
                // handle success
                _this.setState({ data: response.data, games: response.data.games, user: response.data.user, fun: response.data['4fun'], lobby: response.data.games['0'], ranked: response.data.games['1'] })
                switch (_this.state.user.expertise) {
                    case 'amateur':
                        _this.setState({ expertise: '75%' })
                        console.log(_this.state.user.expertise)
                        break;
                    case 'competitive':
                        _this.setState({ expertise: '50%' })
                        break;
                    case 'casual':
                        _this.setState({ expertise: '25%' })
                        break;
                    case 'pro':
                        _this.setState({ expertise: '100%' })
                        break;
                }
                console.log(_this.state.data)
                _this.setState({ server: _this.state.fun.servers });

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })




    }
    copiarText(copy) {
        // copy.select();
        //document.execCommand("copy");
        notify.show('Copiado!');
    }
    componentDidMount() {


    }
    render() {
        const options = {
            items: 3,
            nav: false,
            rewind: false,
            autoplay: false,
            margin: 5,
            dots: false,
        };

        const events = {

        };

        return (

            <section id="bg">
                <Notifications />
                <div className="card-principal">
                    <Header user={this.state.user} exp={this.state.expertise}/>
                    <Body fun={this.state.fun} server={this.state.server} games={this.state.games} data={this.state.data}/>
                </div>
            </section>

        );
    }
}

export default Home;
