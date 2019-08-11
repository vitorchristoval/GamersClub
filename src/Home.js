import React, { Component } from 'react';
import './App.css';
import API from './API'
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel2';
import Notifications, { notify } from 'react-notify-toast';

class Home extends Component {
    constructor(props) {
        super(props);
        this.copiarText = this.copiarText.bind(this);
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
            margin: 10,
            dots: false,
        };

        const events = {

        };

        return (

            <section id="bg">
                <Notifications />
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
                    <div className="card-body">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6 cards">
                                    <div className="title">
                                        <img src={this.state.fun.image} />
                                        {this.state.fun.title}
                                    </div>
                                    <OwlCarousel ref="car" options={options} events={events} >
                                        {this.state.server.map(function (item, i) {
                                            return <div className="forFun col-md-12">
                                                <div className="top-buttons">
                                                    <button><i class="far fa-copy" ></i></button>
                                                    <button className="join" onClick={() => alert(item.join)}><i class="fas fa-sign-in-alt"></i></button>
                                                </div>
                                                <div className="server">
                                                    <h6>#{item.id} - {item.title}</h6>
                                                    <h5>{item.mode}</h5>

                                                    <div className="map">
                                                        <span>{item.map}  {item.current}/{item.max}</span>
                                                        <div class="progress">
                                                            <div class="progress-bar" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="overlay"></div>
                                            </div>


                                        })
                                        }

                                    </OwlCarousel>
                                </div>
                                {this.state.games.map(g =>
                                    <div className="col-md-3 cards">
                                        <div className="title2">
                                            <img src={g.image} />
                                            {g.title}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 card-game">
                                                <h3 className={'partidas' + g.title}>{g.matches}</h3>
                                                PARTIDAS
                                        </div>
                                            <div className="col-md-4 card-game">
                                                <h3 className="vitorias">{g.win}</h3>
                                                VITÓRIAS
                                        </div>
                                            <div className="col-md-4 card-game">
                                                <h3 className="derrotas">{g.lose}</h3>
                                                DERROTAS
                                        </div>
                                            <a href={g.cta.link} className={'cta' + g.title} target="_blank">{g.cta.line != null ? g.cta.line + ' | ' : ''} {g.cta.title}</a>
                                        </div>
                                    </div>
                                )
                                }

                                <div className="row col-md-12">
                                    <div className="col-md-6 antiCheat">
                                        <button><i class="fas fa-download"></i> Download Gamers Club Anti-Cheat</button>
                                    </div>
                                    <div className="col-md-4 offset-md-2">
                                        <div className="row">

                                            <div className="col-md-6 row online">
                                                <div className="col-md-6">
                                                    <h4>{this.state.data.online}</h4>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>Jogadores </p>
                                                    <p>Online</p>
                                                </div>

                                            </div>
                                          <div className="col-md-6 row banidos">
                                                <div className="col-md-6">
                                                    <h4>{this.state.data.latest_banned}</h4>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>Cheaters banidos </p>
                                                    <p>Nos últimos 7 dias</p>
                                                </div>

                                            </div>
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
