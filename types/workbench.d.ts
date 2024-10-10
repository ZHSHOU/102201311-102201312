export interface FeedbackItem {
	_id: string;
	type: number;
	excerpt: number;
	publish_date: any;
	process_status?: number;
	process_result?: string;
	publish_ip?: string;
	user_id?: any;
	feedback_content?: string;
	[key: string]: any;
}