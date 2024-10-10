/**
 * 发布文章所需参数
 */
export interface ArticleType {
	_id?: string; // 唯一标识符
	title: string; // 标题
	content: string; // 内容
	excerpt: string; // 摘要
	picurls: string[]; // 富文本中摘取的图片
	province: string; // 发布人省份
	like_count?: number;
	is_open?: boolean;
	classify_id?: string;
	[key: string]: any
}

/**
 * ai生成页消息类型
 */
export interface MessageType {
	type : "send" | "received" | "load"; 
	content : string;
	create_time: number
}