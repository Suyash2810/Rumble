import { Action } from "@ngrx/store";
import { Favorite } from "../favorite.model";

export const ADD_FAVORITE = "ADD_FAVORITE";

export class AddFavorite implements Action {

    readonly type = ADD_FAVORITE;

    constructor(public payload: { favorite: Favorite }) {

    }
}

export type FavoriteActions = AddFavorite;