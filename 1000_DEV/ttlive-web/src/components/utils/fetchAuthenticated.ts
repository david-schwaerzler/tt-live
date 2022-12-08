import { AppContextProps } from "../../AppContext";
import { Config } from "./Config";

export async function fetchAuthenticate(url: string, context: AppContextProps, init? : RequestInit){
    let response = await fetch(`${Config.REST_URL}/${url}`, init);
    if(response.headers.get("Content-Type")?.includes("text/html")){
        
    }
}