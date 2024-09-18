import axios from "axios";
import { Contact, RequestContact } from "../data/Contact";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

export type ContactResponse = ApiResponse<Contact>;

export async function postContact(requestContact: RequestContact) : Promise<ContactResponse>{
    try {
        let response = await axios.post(`/contact/`, requestContact);
        if (response.status !== 200) {
            console.log(`Error creating contact from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(response.data);

    } catch (error) {
        console.log(`Error creating conact on Server: ${error}`)
        return returnError(`${error}`);
    }
}
