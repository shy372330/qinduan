 import {getDeviceList, addQr} from '../../../api/request'
 import {getCookie} from "../../../assets/js/cookie";
 export default{
   submitUpload() {
     this.$refs.upload.submit();
   },
   handleRemove(file, fileList) {
     console.log(file, fileList);
   },
   handlePreview(file) {
     console.log(file);
   },
 	    //条件搜索
		handleSearch() {
			this.pagination.current = 1;
			this.getTableData()
		},
		//重置搜索条件
		resetForm(formName) {
	        this.$refs[formName].resetFields();
	    },
	     //设置分页大小
		handlePageSizeChange(pageSize) {
			this.pagination.pageSize = pageSize;
			this.getTableData();
		},
		//设置页码
		handleCurrentChange (current) {
			this.pagination.current = current;
			this.getTableData();
		},
		handleCloseAddDialog() {
			this.classFrom =  Object.assign({}, this.defaultClassFrom);
			this.$refs.addClassForm.resetFields();
			this.$refs.createClass.close();
		},
		handleCloseEditDialog(){
			this.editFrom =  Object.assign({}, this.defaultClassFrom);
			this.$refs.editDeviceForm.resetFields();
			this.$refs.editDevice.close();
		},
		handleSave() {                                //---------------------提交新建表单
			this.$refs.addClassForm.validate((valid) => {
		          	if (valid) {
		          		const params = Object.assign({}, this.classFrom);
		          		addClasses(params).then((res) => {
		          			this.$message({
				            	type: 'info',
				            	message: '新建成功'
				          	});
		          			this.$refs.createClass.close();
		          			this.classFrom =  Object.assign({}, this.defaultClassFrom);
							this.$refs.addClassForm.resetFields();
							this.getTableData();
		          		}).catch((err) => {
		          			this.$message({
				            	type: 'warning',
				            	message: '新建失败'
				          	});
		          			console.log(err);
		          		});
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		     	    }
		     });
		},
   handleSaveQr() {   //---------------------提交编号
        let para = {
          start: this.deviceNoForm.startNum,
          end: this.deviceNoForm.endNum
        };
      addQr(para).then((res) => {

          this.$message({
            type: 'info',
            message: '二维码生成成功'
          });
         window.open(res.request.responseURL);
        }).catch((err) => {
          this.$message({
            type: 'warning',
            message: '二维码创建失败'
          });
        });

		},

		getTableData(){
		 //---------------------获取列表数据
        let para = {
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          ...this.filter
        };
        getDeviceList(para).then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.data.total;
        });
		},


 }
