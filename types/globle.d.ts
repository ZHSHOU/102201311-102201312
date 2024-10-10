interface ResultType {
	code : number | string;
	errCode : number | string;
	errMsg : string;
	id ?: string;
	message : string;
	[key : string] : any
}

/**
 * 对返回值进行约束
 */
export interface ApiResponse {
	result : ResultType
}

type MethodType = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT"

/**
 * 对uni.request option进行约束
 */
export interface RequestOption {
	url : string;
	method ?: MethodType;
	data ?: any;
	header ?: any;
	[key : string] : any
}

type CloudMethodType = "POST" | "GET" | "PUT" | "DELETE" | undefined

/**
 * 对uniclod 请求第三方接口 option进行约束
 */
export interface CloudRequsetOption {
	url : string;
	method ?: CloudMethodType;
	data ?: any;
	header ?: any;
	contentType ?: string;
	dataType ?: string;
	[key : string] : any
}