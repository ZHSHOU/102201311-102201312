export interface FabType {
	iconPath : string;
	selectedIconPath : string;
	text : string;
	active : boolean;
	path: string
}

export interface ClassifyItem {
	categoryName: string;
	delete_status: 0 | 1;
	last_modify_date: number;
	publish_date: number;
	publish_ip: string;
	remark: string;
	user_id: string;
	_id: string;
	[key: string]: any
}