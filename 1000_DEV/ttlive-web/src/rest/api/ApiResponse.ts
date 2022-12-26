export interface ApiResponse<Type> {
    error : string | null;
    data : Type | null;
}

export function returnError<Type>(error: string) : ApiResponse<Type>{
    return {error: error, data: null};
}

export function returnData<Type>(data: Type) : ApiResponse<Type>{
    return {error: null, data: data};
}