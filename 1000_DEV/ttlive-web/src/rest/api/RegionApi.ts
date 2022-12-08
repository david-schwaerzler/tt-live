import { Config } from "../../components/utils/Config";
import { Region } from "../data/Region";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

export type RegionsResponse = ApiResponse<Array<Region>>;

export async function fetchRegions(): Promise<RegionsResponse> {
    try {
        let response = await fetch(Config.REST_URL + "/region")
        if (!response.ok) {
            console.log(`Error fetching regions from the Server: '${response.status}'`)
            return returnError(response.status.toString());            
        }
        let regions: Array<Region> = await response.json();
        regions.sort((a, b) => a.name.localeCompare(b.name));
        return returnData(regions);
    } catch (error) {
        console.log(`Error fetching regions. error: '${error}'`)
        return returnError(`${error}`);
    }
}