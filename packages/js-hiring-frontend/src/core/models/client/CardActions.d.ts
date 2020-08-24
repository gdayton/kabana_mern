import Card from "../Card";

export default interface CardActions {
    getCards(): any;
    createCard(card: Card): any;
    editCard(_id: String, card: Card): any;
    removeCard(_id: String): any;
}