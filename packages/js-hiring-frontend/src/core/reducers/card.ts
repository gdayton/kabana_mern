import { AnyAction as Action } from "redux";
import CardState from "../models/client/CardState";
import { GET_CARDS_BEGIN, GET_CARDS_SUCCESS, GET_CARDS_ERROR, 
         UPDATE_CARD_BEGIN, UPDATE_CARD_ERROR, UPDATE_CARD_SUCCESS, 
         CREATE_CARD_SUCCESS, CREATE_CARD_BEGIN, CREATE_CARD_ERROR,
         REMOVE_CARD_BEGIN, REMOVE_CARD_ERROR, REMOVE_CARD_SUCCESS } from "../actions/card"; 
import Card from "../models/Card";
import Cards from "../../Card/Cards";

const initialState: CardState = {
    loading: false,
    valid: false,
    error: '',
    cards: []
};

const card = (state: CardState = initialState, action: Action): CardState => {
    switch(action.type) {
        case GET_CARDS_BEGIN:
        case UPDATE_CARD_BEGIN:
        case CREATE_CARD_BEGIN:
        case REMOVE_CARD_BEGIN:
            return {...state, loading: true};
        case GET_CARDS_SUCCESS:
            return {
                ...state,
                loading: false,
                cards: action.cards.data
            };
        case UPDATE_CARD_SUCCESS:
            return {
                ...state,
                loading: false,
                cards: state.cards.map(card => (card._id === action.card._id) ? action.card : card)
            }
        case CREATE_CARD_SUCCESS:
            return {
                ...state,
                loading: false,
                cards: [
                    ...state.cards,
                    action.card
                ]
            };
        case REMOVE_CARD_SUCCESS: 
            return {
                ...state, 
                loading: false,
                cards: state.cards.filter(card => (card._id !== action._id))
            };
        case GET_CARDS_ERROR:
        case UPDATE_CARD_ERROR:
        case CREATE_CARD_ERROR:
        case REMOVE_CARD_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default card;