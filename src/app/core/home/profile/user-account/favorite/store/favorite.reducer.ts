import * as FavoriteActions from './favorite.actions';
import { Favorite } from '../favorite.model';

export interface State {

    favorites: Array<Favorite>
}

const initialState: State = {

    favorites: [

    ]
}

export function FavoriteReducer(state = initialState, action: FavoriteActions.FavoriteActions) {

    switch (action.type) {

        case FavoriteActions.ADD_FAVORITE: {
            return {
                ...state,
                favorites: [
                    ...state.favorites,
                    action.payload.favorite
                ]
            }
        };
        default: return state;
    }
}