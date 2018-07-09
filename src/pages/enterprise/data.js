export default{
	init:function(){
		let filter = {
				className: ''
			};
			return{
        studentData:[
          {
            studentNo:'2111847',
            studentName:'好产品',
            className:'英才班',
            gradate:'高三',
            masterName:'davis'
          }
        ],
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
				stuFrom:{
					studentName:'',
					classesId:''
				},
				defaultstuFrom:{
					studentName:'',
					classesId:''
				},
				dialogCreateStu:false
			}
	}
}
