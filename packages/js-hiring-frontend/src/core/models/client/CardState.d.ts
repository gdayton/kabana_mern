import Card from "../Card";

export default interface CardState {
    loading: boolean,
    valid: boolean,
    error: string
    cards: Card[]
}