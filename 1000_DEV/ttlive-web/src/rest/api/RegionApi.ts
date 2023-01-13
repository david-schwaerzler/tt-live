import axios from "axios";
import { Region } from "../data/Region";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

export type RegionsResponse = ApiResponse<Array<Region>>;

export async function fetchRegions(): Promise<RegionsResponse> {
    try {
        let response = await axios.get("/region")
        if (response.status !== 200) {
            console.log(`Error fetching regions from the Server: '${response.status}'`)
            return returnError(response.status.toString());            
        }

        let regions: Array<Region> = response.data;
        regions.sort((a, b) => a.name.localeCompare(b.name));
        return returnData(regions);
    } catch (error) {
        console.log(`Error fetching regions. error: '${error}'`)
        return returnError(`${error}`);
    }
}