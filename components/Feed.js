import React, {Component} from "react";
import classNames from "classnames";
import $ from "jquery";

export class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: []
        };
    }

    componentDidMount() {
        this._loadOffersFromServer();
    }

    render() {
        let offers = this.state.offers.map((offer) => {
            return (
                <FeedItem offer={offer} key={offer.id}/>
            );
        });

        return (
            <div>
                <img className="logo" src={require("../uploads/img/logo.png")}/>
                <div className="introduction">
                    <div className="introduction__statistics">
                        There are {offers.length} offers for now.
                    </div>
                </div>
                <div className="feed">
                    {offers}
                </div>
            </div>
        );
    }

    _loadOffersFromServer() {
        $.getJSON("/query",
            (res) => {
                if (res.status !== "OK") {
                    console.error(`ERROR ${res.status} : ${res.message}`);
                    return;
                }

                this.setState({
                    offers: res.data
                });
            }
        );
    }
}

export class FeedItem extends Component {
    render() {
        let offer = this.props.offer;
        return (
            <div className="item">
                <img src={offer.header_image}/>
                <div className="item__discount">
                    -{offer.discount_percent}%
                </div>
                <div className="item__content">
                    <div className="item__content__left">
                        <div className="item__content__left__title">
                            {offer.name}
                        </div>
                        <div className="item__content__left__supports">
                            <i className={classNames({
                                "fa fa-fw fa-windows": true,
                                "fa--active": offer.windows_available
                            })}></i>
                            <i className={classNames({
                                "fa fa-fw fa-apple": true,
                                "fa--active": offer.mac_available
                            })}></i>
                            <i className={classNames({
                                "fa fa-fw fa-linux": true,
                                "fa--active": offer.linux_available
                            })}></i>
                        </div>
                    </div>
                    <div className="item__content__right">
                        <div>
                            <span className="item__content__right__previous_price">
                                {::this._formatPrice(offer.original_price)}
                            </span>
                            <span>
                                {::this._formatPrice(offer.final_price)}
                            </span>
                        </div>
                        <div>
                            <a href={`http://store.steampowered.com/app/${offer.id}`}
                               target="_blank"
                               className="item__content__right__button">
                                Buy now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _formatPrice(price) {
        return "$" + (price / 100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
}