import React from "react";
import { MapStateToPropsParam, MapDispatchToPropsParam, connect } from "react-redux";
import { Dispatch, bindActionCreators, Action } from "redux";
import actions from "../actions";
import AppActions from "../models/client/AppActions";

const mapStateToProps: MapStateToPropsParam<any, any, any> = (state: any): any => {
    return {
        state
    };
};

const mapDispatchToProps: MapDispatchToPropsParam<AppActions, any> = (dispatch: Dispatch<Action>): any => {
    return {
        actions: bindActionCreators(actions as any, dispatch)
    };
};

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
    return {...stateProps,  ...dispatchProps, ...ownProps};
};

export default function connectAllProps(Component: React.ComponentClass<any>) {
    return connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    )(Component);
}