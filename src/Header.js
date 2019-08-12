import React, { Component } from 'react';
import './App.css';
import API from './API'
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel2';
import Notifications, { notify } from 'react-notify-toast';

class Header extends Component {
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

    componentDidMount() {
        console.log(this.props)

    }

 
    render() {
        

        return (

       
                <div className="col-md-12 header-card">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="row">
                                <div className="avatar col-md-4">
                                    <img src="/img/avatar.jpeg" />
                                </div>
                                <div className="nome col-md-8">
                                    <h6>{this.props.user.name}</h6>
                                    <p> GC ID: {this.props.user.id}</p>
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
                                    <div class="progress-bar" role="progressbar" style={{ width: this.props.exp }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
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
                                    <img src={this.props.user.patent} />
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
            
        );
    }
}

export default Header;
