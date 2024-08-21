import { call, takeLatest, put} from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
/*import { AxiosResponse } from "axios";*/
import {loadTableSuccessAction, loadTableErrorAction} from "../reducers/createTableSlice";

import {
    LOAD_DATA_TABLE
} from "../actions";
const rows = [
    { order: 1, id:123, name: "Patient Number", constraint: "", aggregation:"Value", included:true, demographic: true},
    { order: 2, id:122, name: "Gender", constraint: "", aggregation:"Value", included:true, demographic: true},
    { order: 3, id:121, name: "Age", constraint: "", aggregation:"Value", included:true, demographic: true},
    { order: 4, id:111, name: "Race", constraint: "", aggregation:"Value", included:false, demographic: true},
    { order: 5, id:58, name: "Ethnicity", constraint: "", aggregation:"Value", included:false, demographic: true},
    { order: 6, id:35, name: "Vital Status", constraint: "", aggregation:"Value", included:false, demographic: true},
    { order: 7, id:36, name: "Hemoglobin A1C (Test:mcsq-a1c)", constraint: "something here", aggregation:"Maximum Value"},
    { order: 8, id:25, name: "Hemoglobin A1C (Test:mcsq-a1c)", constraint: "something here", aggregation:"Mode (Most Frequent Value)"},
    { order: 9, id:136, name: "Hemoglobin A1C (Test:mcsq-a1c)", constraint: "something here", aggregation:"Date (Most Recent)"},
    { order: 10, id:125, name: "Hemoglobin A1C (Test:mcsq-a1c)", constraint: "something here", aggregation:"Average Value"}
];

export function* doLoadTable(action) {
    try {
        // You can also export the axios call as a function.
        //const response = yield axios.get(`your-server-url:port/api/users/${id}`);
        const response = {data: rows};

        yield put(loadTableSuccessAction(response.data));
    } catch (error) {
        yield put(loadTableErrorAction({error: "There was an error getting the data table"}));
    }
}


export function* loadTableSaga() {
    yield takeLatest(LOAD_DATA_TABLE, doLoadTable);
}
