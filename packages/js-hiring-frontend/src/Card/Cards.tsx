import React, { Fragment } from "react";
import CardDetail from "./CardDetail";
import Status from "../core/models/Status";
import { ComponentProps } from "../core/shared/ComponentProps";
import connectAllProps from "../core/shared/connect";
import Card from "../core/models/Card";

interface Props extends ComponentProps {
    status: Status;
    value: Card;
}

class Cards extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
    }

    render(): any {
        if(this.props.state.card.cards && !this.props.state.card.loading) {
            const loading: boolean | undefined = this.props.state.card.loading;
            const cards: any = this.props.state.card ? this.props.state.card.cards : [];
            return <Fragment>
                { 
                    cards
                    .filter((card: Card) => card.status === this.props.status)
                    .map((card: Card) => (
                        <CardDetail value={card} key={card._id}></CardDetail>
                    )) 
                }
            </Fragment>;
        } else {
            return <p>Loading...</p>;
        }
    }
}

export default connectAllProps(Cards);