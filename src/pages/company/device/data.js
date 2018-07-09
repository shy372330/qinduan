import {BaseURL, axios} from '../../../api/config';
export default{
	init:function(){
		let filter = {
				className: ''
			};
			return{
        batchCreat:`${BaseURL}/device/batchCreat`,
        fileList: [],
        tableData:[],
        filter: filter,													//查询条件
				activeCollapse: 'search',										//开关查询折叠面板
				pagination: {
					total: 0,
					current: 1,
					pageSize: 10
				},																//巡检计划列表分页数据
				editVisible: false,
        dialogCreateDevice: false,
        dialogGetMaxNo: false,
        dialogCreateQr: false,
				dialogEditDevice: false,
				classFrom:{
              deviceSuffix:'',
              deviceType:'',
              status:'',
              runStatus:'',
				},
        deviceNoForm:{
             startNum:'',
              endNum:'',
				},
				editFrom:{
                  deviceSuffix:'',
                  deviceType:'',
                   status:'',
                   runStatus:'',

				},
				defaultClassFrom:{
                   className:'',
                   gradge:'',
                   masterName:'',
                   message:''
				},

			}
	}
}
