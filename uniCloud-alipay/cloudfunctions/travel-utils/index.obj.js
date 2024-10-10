/**
 * 由于有些操作使用JQL语法无法完成，所以得借助云对象
 */

const db = uniCloud.database();
const dbCmd = db.command;
const config = require("./config.js");
module.exports = {
	_before: function() { // 通用预处理器

	},

	/**
	 * 自增操作 自增或自减
	 * 
	 * @param {Object} table 表名称
	 * @param {Object} attr  字段名
	 * @param {Object} id    所修改行数据的id
	 * @param {Object} num   增多少, 可为负数
	 */
	async customOperation(table, attr, id, num = 1) {
		let obj = {};
		obj[attr] = dbCmd.inc(num);
		return await db.collection(table).doc(id).update(obj)
	},

	/**
	 * 调用阿里云qwen-turbo服务
	 * 
	 * @param {Object} inputValue 所需问题
	 */
	async getAIAnswer(inputValue) {
		// return {
		// 	code: 0,
		// 	message: "有什么可以帮助到您呢？"
		// }
				
		if (!inputValue) {
			return {
				code: 0,
				message: "有什么可以帮助到您呢？"
			}
		}
		const apiUrl = config.TURBO_BASE_URL + "/api/v1/services/aigc/text-generation/generation"
		const response = await uniCloud.request({
			url: apiUrl,
			method: "POST",
			header: {
				"Authorization": "Bearer " + config.TURBO_KEY,
				'Content-Type': 'application/json',
			},
			data: {
				"model": "qwen-turbo",
				"input": {
					"messages": [{
							"role": "system",
							"content": "You are a helpful assistant."
						},
						{
							"role": "user",
							"content": inputValue
						}
					]
				},
				"parameters": {
					"result_format": "message"
				}
			}
		})
		
		if (response.statusCode === 200) {
			const content = response.data.output.choices[0].message.content;
			return {
				code: 0,
				message: content
			}
		}
	}
}