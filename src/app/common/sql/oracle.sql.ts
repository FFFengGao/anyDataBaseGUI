import * as _ from 'lodash';

export class OracleQueryBuilder {
	/**
	 * 创建一个find方法
	 * @param tableName 表名 例如: 'tableName1'
	 * @param columnName 列名以','隔开 例如: 'id, name', 或为传入子查询
	 */
	createQueryBuilder(){
		return new SQLBuilder();
	}
}

/**
 * 查询单条语句方法
 */
export class SQLBuilder {
	public sqlStr: string;
	constructor(){}

	/**
	 * 1.传入数组则进行拼接
	 * 2.传入子查询则直接拼接
	 * 3.不传入则默认为全部
	 * @param obj any
	 */
	select(arr){
		this.sqlStr += 'SELECT ';
		if (_.isArray(arr)){
			// 1.传入数组则进行拼接
			this.sqlStr += arr.join(' ');
		} else if (!arr){
			// 不传入则默认为全部
			this.sqlStr += '*';
		}else{
			// 传入子查询则直接拼接
			this.sqlStr += arr;
		}
		return this;
	}

	/**
	 * from
	 * 1.from为键值对 key（表名）:value（别名）
	 * {
	 *    user: 'u'
	 * }
	 * 2.传入子查询则直接进行拼接
	 * @param User
	 */
	from(obj){
		this.sqlStr += 'from ';
		if (_.isObject(obj)){
			// from为键值对 key（表名）:value（别名）
			_.forEach(obj, (value, key) => {
				this.sqlStr += key + ' ';
				this.sqlStr += value + ' ';
			});
		}else{
			this.sqlStr += obj;
		}
		return this;
	}

	/**
	 * .where({like: [{}]})
	 * .where({or: [{}]})
	 * .where({and: [{}]})
	 * .where({in: []})
	 * .where({not: {}})
	 * .where({exists: ""})
	 * @param whereObj
	 */
	where(whereObj: any){
		this.sqlStr += 'where ';
		return new WhereSQLBuilder(whereObj, this);
	}

	andWhere(){

	}

	skip(){

		return this;
	}

	limit(){
		return this;
	}

	sort(){
		return this;
	}
}

/**
 * 拼接where语句的方法
 * @param whereObj
 */
class WhereSQLBuilder {
	constructor(
		public whereObj: any,
		public queryBuilder: any,
	){}
	where(){

	}
}

/**
 * 一般数组组合
 */
// function isArrayBuilder(arr, key): string{
//   let whereArry = [];
//   _.map(arr, (obj) => {
//     whereArry.push(whereSQLBuilder(obj));
//   });
//   return whereArry.join(key);
// }

// /**
//  * 一般对象组合
//  */
// function isObjectBuilder(arr, key): string {
//   // 如果是对象,则使用等于进行递归
//   let valueObj = '';
//   _.forEach(arr, (obj, index) => {
//     valueObj += index + ' ';
//     valueObj += ' = ';
//     valueObj += whereSQLBuilder(obj) + ' ';
//   });
//   return valueObj;
// }

// function whereSQLBuilder(whereObj: any): string{
//   let whereStr: string;
//   _.forEach(whereObj, (value, key) => {
//     if (_.isArray(value)) {
//       // 如果为数据，则使用key值将其拼接
//       let whereArry = [];
//       _.map(value, (obj) => {
//         whereArry.push(whereSQLBuilder(obj));
//       });
//       whereStr += whereArry.join(key);
//     } else if (_.isObject(value)) {
//       // 如果是对象,则使用等于进行递归
//       let valueObj = '';
//       _.forEach(value, (obj, index) => {
//         valueObj += index + ' ';
//         valueObj += ' = ';
//         valueObj += whereSQLBuilder(obj) + ' ';
//       });
//       whereStr += valueObj;
//     } else {
//       whereStr += key + ' ' + value + ' ';
//     }
//   });

//   return whereStr;
// }