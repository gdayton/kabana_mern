import React, { Component } from "react";
import Card from "../core/models/Card";
import Status from "../core/models/Status";
import { ComponentProps } from "../core/shared/ComponentProps";
import connectAllProps from "../core/shared/connect";
import './Card.css';

interface Props extends ComponentProps {
    value: Card;
}

interface States {
    mode: "edit" | "preview";
    title: string,
    description: string,
    story_points: number,
    status: Status
}

class CardDetail extends React.Component<Props, States>{
  private originalTitle: string = "";
  private originalDescription: string = "";
  private originalStoryPoints: number = 0;
  private originalStatus: Status = Status.READY;

  constructor(props: Props) {
    super(props);
    if(this.props.value) {
      this.originalTitle = this.props.value.title;
      this.originalDescription = this.props.value.description;
      this.originalStoryPoints = this.props.value.story_points;
      this.originalStatus = this.props.value.status;
    }
    this.state = {
      mode: "preview",
      title: this.originalTitle,
      description: this.originalDescription,
      story_points: this.originalStoryPoints,
      status: this.originalStatus
    }
  }

  render(): any {
      const card: Card = this.props.value;
      const renderEditOrPreview = this.state.mode === "preview" ? (
        <>
          <b className="story_points">{ card.story_points }</b>
          { card.title.length == 0 ? <b>Click to edit</b> : null }
          <b>{ card.title }</b>
          <p>{ card.description }</p>
        </>
      ) : (
        <>
          <label>Title<input 
            type="text" 
            value={this.state.title} 
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              event.preventDefault();
              this.changeTitle(event.target.value);
            }} /></label><br />
          <label>Description<input 
            type="text" 
            value={this.state.description} 
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              event.preventDefault();
              this.changeDescription(event.target.value);
            }} /></label><br />
          <label>Story Points<input 
            type="text" 
            value={this.state.story_points} 
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
              event.preventDefault();
              this.changeStoryPoints(event.target.value);
            }} /></label><br />
          <button type="submit" onClick={this.submitEdit}>Save</button>
        </>
      );

      return <div className={`card card-${card.status}`} onClick={this.editMode}>
          <div className="card-content">
            { renderEditOrPreview }
          </div>
          <button onClick={event => {
            event.preventDefault();
            this.deleteCard(card._id)
          }} className="delete-action">Delete</button>
          <select onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
              event.preventDefault();
              this.changeStatus(event.target.value);
            }} value={card.status}>
            <option value={Status.READY}>Ready</option>
            <option value={Status.IN_PROGRESS}>In Progress</option>
            <option value={Status.QA}>QA</option>
            <option value={Status.COMPLETE}>Complete</option>
          </select>
      </div>;
  }

  private editMode = (): void => {
    this.setState({mode: "edit"});
  }

  private submitEdit = (): void => {
    let editedCard: Card = this.props.value;
    editedCard.title = this.state.title;
    editedCard.description = this.state.description;
    editedCard.story_points = this.state.story_points;
    this.props.actions.editCard(editedCard._id, editedCard);
    this.setState({mode: "preview"});
  }

  private changeStatus = (newVal: string): void => {
    let editedCard: Card = this.props.value;
    editedCard.status = newVal as Status;
    this.props.actions.editCard(editedCard._id, editedCard);
  }

  private changeTitle = (newVal: string): void => {
    this.setState({title: newVal});
  }

  private changeDescription = (newVal: string): void => {
    this.setState({description: newVal});
  }

  private changeStoryPoints = (newVal: string): void => {
    this.setState({story_points: parseInt(newVal)});
  }

  private deleteCard = (_id: string): void => {
    this.props.actions.removeCard(_id);
  }
}

export default connectAllProps(CardDetail);