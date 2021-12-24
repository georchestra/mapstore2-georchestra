import {MAPS_LIST_LOADING} from "@mapstore/actions/maps";
import Rx from "rxjs";
import {searchContexts} from "@mapstore/actions/contextmanager";

export const searchContextsOnMapSearch = action$ =>
    action$.ofType(MAPS_LIST_LOADING)
        .switchMap(({ searchText }) => Rx.Observable.of(searchContexts(searchText)));
