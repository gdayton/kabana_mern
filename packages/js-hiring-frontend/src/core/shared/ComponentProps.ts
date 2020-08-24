import AppState from "../models/client/AppState";
import AppActions from "../models/client/AppActions";

export interface ComponentProps {
    state: AppState,
    actions: AppActions
}