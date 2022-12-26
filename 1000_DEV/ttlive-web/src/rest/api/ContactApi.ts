import { Config } from "../../components/utils/Config";
import { Contact, RequestContact } from "../data/Contact";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

export type ContactResponse = ApiResponse<Contact>;

export async function postContact(requestContact: RequestContact) : Promise<ContactResponse>{
    try {
        let response = await fetch(`${Config.REST_URL}/contact/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestContact)
        });
        if (!response.ok) {
            console.log(`Error creating contact from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let contact: Contact = await response.json();
        return returnData(contact);

    } catch (error) {
        console.log(`Error creating conact on Server: ${error}`)
        return returnError(`${error}`);
    }
}
