import React from 'react';

import Cards from "./Card/Cards";
import Card from "./core/models/Card";
import Status from "./core/models/Status";
import { ComponentProps as Props } from "./core/shared/ComponentProps";
import connectAllProps from "../src/core/shared/connect";

import './App.css';

class App extends React.Component<Props>{
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    // get all the cards
    this.props.actions.getCards();
  }

  render(): any {
    return (
      <div className="row">
        <div className="column">
          <h3>Ready</h3>
          <Cards status={Status.READY}></Cards>
          <div className="new">
            <button type="button" onClick={event => {
              event.preventDefault();
              this.newCard(Status.READY)
            }}>New Ready Card</button>
          </div>
        </div>
        <div className="column">
          <h3>In Progress</h3>
          <Cards status={Status.IN_PROGRESS}></Cards>
          <div className="new">
            <button type="button" onClick={event => {
              event.preventDefault();
              this.newCard(Status.IN_PROGRESS)
            }} >New In Progress</button>
          </div>
        </div>
        <div className="column">
          <h3>QA</h3>
          <Cards status={Status.QA}></Cards>
          <div className="new">
            <button onClick={event => {
              event.preventDefault();
              this.newCard(Status.QA)
            }} type="button">New QA Card</button>
          </div>
        </div>
        <div className="column">
          <h3>Complete</h3>
          <Cards status={Status.COMPLETE}></Cards>
          <div className="new">
            <button onClick={event => {
              event.preventDefault();
              this.newCard(Status.COMPLETE)
            }} type="button">New Complete Card</button>
          </div>
        </div>
      </div>
    );
  }

  private newCard = (status: Status): void => {
    const blankCard: Card = {
      _id: "",
      title: "",
      description: "",
      story_points: 0,
      status
    }
    console.log("new Card: ", blankCard);
    this.props.actions.createCard(blankCard);
  }
}

export default connectAllProps(App);
