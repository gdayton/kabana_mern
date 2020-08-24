import Card from "../models/Card";
import CardActions from "../models/client/CardActions";
import { Dispatch, AnyAction as Action } from "redux";
import axios, { AxiosResponse, AxiosError } from "axios";

import GetCardResponse from "../models/response/GetCardsResponse";

export const GET_CARDS_BEGIN: string = "GET_CARDS_BEGIN";
export const GET_CARDS_SUCCESS: string = "GET_CARDS_SUCCESS";
export const GET_CARDS_ERROR: string = "GET_CARDS_ERROR";
export const UPDATE_CARD_BEGIN: string = "UPDATE_CARD_BEGIN";
export const UPDATE_CARD_SUCCESS: string = "UPDATE_CARD_SUCCESS";
export const UPDATE_CARD_ERROR: string = "UPDATE_CARD_ERROR";
export const REMOVE_CARD_BEGIN: string = "REMOVE_CARD_BEGIN";
export const REMOVE_CARD_SUCCESS: string = "REMOVE_CARD_SUCCESS";
export const REMOVE_CARD_ERROR: string = "REMOVE_CARD_ERROR";
export const CREATE_CARD_BEGIN: string = "CREATE_CARD_BEGIN";
export const CREATE_CARD_SUCCESS: string = "CREATE_CARD_SUCCESS";
export const CREATE_CARD_ERROR: string = "CREATE_CARD_ERROR";

let hostUrl: string = "http://localhost:4000";

const cardActions: CardActions = {
    getCards(): any {
        return async (dispatch: Dispatch<any>): Promise<void> => {
            dispatch({type: GET_CARDS_BEGIN});

            try {
                let response: AxiosResponse = await axios({
                    url: `${hostUrl}/api/card`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: false
                });

                if(response && response.data) {
                    dispatch({
                        type: GET_CARDS_SUCCESS,
                        cards: response.data
                    });
                }
            } catch(error) {
                dispatch({type: GET_CARDS_ERROR, error});
            }
        };
    },
    editCard(_id: string, card: Card): any {
        return async (dispatch: Dispatch<any>): Promise<void> => {
            dispatch({type: UPDATE_CARD_BEGIN});

            try {
                let response: AxiosResponse = await axios({
                    url: `${hostUrl}/api/card`,
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: false,
                    data: card
                });

                if(response && response.data) {
                    dispatch({
                        type: UPDATE_CARD_SUCCESS,
                        card
                    });
                }
            } catch(error) {
                dispatch({type: UPDATE_CARD_ERROR, error});
            }
        };
    },
    createCard(card: Card): any {
        return async (dispatch: Dispatch<any>): Promise<void> => {
            dispatch({type: CREATE_CARD_BEGIN});

            try {
                let response: AxiosResponse = await axios({
                    url: `${hostUrl}/api/card`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: false,
                    data: card
                });

                if(response && response.data) {
                    dispatch({
                        type: CREATE_CARD_SUCCESS,
                        card: response.data
                    });
                }
            } catch(error) {
                dispatch({type: CREATE_CARD_ERROR, error});
            }
        };
    },
    removeCard(_id: string): any {
        return async (dispatch: Dispatch<any>): Promise<void> => {
            dispatch({type: REMOVE_CARD_BEGIN});

            try {
                let response: AxiosResponse = await axios({
                    url: `${hostUrl}/api/card/${_id}`,
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: false,
                    data: {}
                });

                dispatch({
                    type: REMOVE_CARD_SUCCESS,
                    _id
                });
            } catch(error) {
                dispatch({type: REMOVE_CARD_ERROR, error});
            }
        };
    }
};

export default cardActions;