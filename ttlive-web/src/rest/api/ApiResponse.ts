export interface ApiResponse<Type> {
    error : string | null;
    data : Type | null;
    status: number
}

export function returnError<Type>(error: string, status?: number) : ApiResponse<Type>{
    return {error: error, data: null, status: status ?? -1};
}

export function returnData<Type>(data: Type) : ApiResponse<Type>{
    return {error: null, data: data, status: 200};
}