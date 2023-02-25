import axios from "axios";
import { AccountFilter, RequestAccountFilter } from "../data/AccountFilter";
import { AccountFilterSet, RequestAccountFilterSet } from "../data/AccountFilterSet";
import { ApiResponse, returnError, returnData } from "./ApiResponse";

export type AccountFilterSetResponse = ApiResponse<AccountFilterSet>;
export type AccountFilterSetsResponse = ApiResponse<Array<AccountFilterSet>>;
export type AccountFilterResponse = ApiResponse<AccountFilter>;

export async function fetchAccountFilterSets(): Promise<AccountFilterSetsResponse> {
    try {      

        let response = await axios.get(`/secured/filterSet`);
        if (response.status !== 200) {
            console.log(`Error fetching filterSets from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(response.data)

    } catch (error) {
        console.log(`Error fetching filterSets from the Server: ${error}`)
        return returnError(`${error}`);
    }
}


export async function postAccountFilterSet(requestfilterSet: RequestAccountFilterSet): Promise<AccountFilterSetResponse> {
    try {      

        let response = await axios.post(`/secured/filterSet`, requestfilterSet);
        if (response.status !== 200) {
            console.log(`Error creating filterSets on the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(response.data)

    } catch (error) {
        console.log(`Error creating filterSets from the Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function putAccountFilterSet(id: number, requestfilterSet: RequestAccountFilterSet): Promise<AccountFilterSetResponse> {
    try {      

        let response = await axios.put(`/secured/filterSet/${id}`, requestfilterSet);
        if (response.status !== 200) {
            console.log(`Error updating filterSets on the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(response.data)

    } catch (error) {
        console.log(`Error updating filterSets from the Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function deleteAccountFilterSet(id: number): Promise<ApiResponse<{}>> {
    try {      

        let response = await axios.delete(`/secured/filterSet/${id}`);
        if (response.status !== 200) {
            console.log(`Error deleting filterSets on the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(response.data)

    } catch (error) {
        console.log(`Error deleting filterSets from the Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function postAccountFilter(filterSetId: number, requestFilter: RequestAccountFilter): Promise<AccountFilterResponse> {
    try {      

        let response = await axios.post(`/secured/filterSet/${filterSetId}/filter`, requestFilter);
        if (response.status !== 200) {
            console.log(`Error adding filter to filterSet on the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(response.data)

    } catch (error) {
        console.log(`Error filter to filterSet on the Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function deleteAccountFilter(filterSetId: number, filterId: number): Promise<ApiResponse<{}>> {
    try {      

        let response = await axios.delete(`/secured/filterSet/${filterSetId}/filter/${filterId}`);
        if (response.status !== 200) {
            console.log(`Error deleting filterSets on the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(response.data)

    } catch (error) {
        console.log(`Error deleting filterSets from the Server: ${error}`)
        return returnError(`${error}`);
    }
}