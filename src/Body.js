import React, { Component } from 'react';
import './App.css';
import API from './API'
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel2';
import Notifications, { notify } from 'react-notify-toast';
import Header from './Header';
import copy from 'clipboard-copy'

class Body extends Component {
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


            <div className="card-body">
                
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6 cards borderBottom">
                            <div className="title">
                                <img src={this.props.fun.image} />
                                {this.props.fun.title}
                            </div>
                            <OwlCarousel ref="car" options={options} events={events} >
                                {this.props.server.map(function (item, i) {
                                    return <div className="forFun col-md-12">
                                        <div className="top-buttons">
                                            <button onClick={() =>  (copy(item.join), notify.show('Copiado! 🎮 ', 'success'))}><i class="far fa-copy" ></i></button>
                                            <button className="join" onClick={() => window.open(item.join,  '_blank')}><i class="fas fa-sign-in-alt"></i></button>
                                        </div>
                                        <div className="server">
                                            <h6>#{item.id} - {item.title}</h6>
                                            <h5>{item.mode}</h5>
                                         
                                            <div className="map">
                                                <span>{item.map}  {item.current}/{item.max}</span>
                                                <div class="progress">
                                                  
                                                    <div class="progress-bar" role="progressbar" style={{ width: ((item.max - item.current) / item.max  * 100 )+ '%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="overlay"></div>
                                    </div>


                                })
                                }

                            </OwlCarousel>
                        </div>
                        {this.props.games.map(g =>
                            <div className="col-md-3 cards borderBottom borderLeft">
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
                                            <h4>{this.props.data.online}</h4>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Jogadores </p>
                                            <span>Online</span>
                                        </div>

                                    </div>
                                    <div className="col-md-6 row banidos">
                                        <div className="col-md-3">
                                            <h4>{this.props.data.latest_banned}</h4>
                                        </div>
                                        <div className="col-md-9">
                                            <p>Cheaters banidos </p>
                                            <span>Nos últimos 7 dias</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Body;
