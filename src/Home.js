import React, { Component } from 'react';
import './App.css';
import API from './API'
import axios from 'axios';


class Home extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        data: [],
        fun: [],
        games: [],
        expertise: '',
        user: [],
        loading: false,
    }
    componentWillMount() {
        let _this = this;
        axios.get(API.url)
            .then(function (response) {
                // handle success
                _this.setState({ data: response.data, games: response.data.games, user: response.data.user })
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
                console.log(_this.state.user)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })




    }
    componentDidMount() {
        if (this.state.user != undefined) {
            console.log(this.state.user.expertise)

        }

    }
    render() {
        return (

            <section id="bg">
                <div className="card-principal">
                    <div className="col-md-12 header-card">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="row">
                                    <div className="avatar col-md-4">
                                        <img src="/img/avatar.jpeg" />
                                    </div>
                                    <div className="nome col-md-8">
                                        <h6>{this.state.user.name}</h6>
                                        <p> GC ID: {this.state.user.id}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row progresso">
                                    <div className="pin-top row col-md-12">
                                        <div className="item casual">
                                            CASUAL <img src="/img/pin.svg" className="rotate" />
                                        </div>
                                        <div className=" item amador" >
                                            AMADOR <img src="/img/pin.svg" className="rotate" />
                                        </div>
                                    </div>

                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style={{ width: this.state.expertise }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>

                                    <div className="pin-top row col-md-12">
                                        <div className="item competitivo">
                                            COMPETITIVO <img src="/img/pin.svg" />
                                        </div>
                                        <div className=" item pro" >
                                            PRO <img src="/img/pin.svg" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="row">
                                    <div className="col-md-12 itens-header">
                                        <img src="/img/helmet.png" />
                                        <img src="/img/Beginner.svg" />
                                        <img src={this.state.user.patent} />
                                        <div className="placar">
                                            0
                                        </div>
                                        <div className="premium">
                                            <img src="/img/premium-ii-medal.png" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Home;
