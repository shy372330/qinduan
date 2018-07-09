 import {getDeviceList,removeDeviceById,addDevice, addQr, updateDevice} from '../../../api/request'
 import {getCookie} from "../../../assets/js/cookie";
import {formatDateTime} from "../../../assets/js/formatDateTime";
 export default {
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
   handleCurrentChange(current) {
     this.pagination.current = current;
     this.getTableData();
   },
   handleCloseAddDialog() {
     this.classFrom = Object.assign({}, this.defaultClassFrom);
     this.$refs.addClassForm.resetFields();
     this.$refs.createClass.close();
   },
   handleCloseEditDialog() {
     this.editFrom = Object.assign({}, this.defaultClassFrom);
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
           this.classFrom = Object.assign({}, this.defaultClassFrom);
           this.$refs.addClassForm.resetFields();
           this.getTableData();
         }).catch((err) => {
           this.$message({
             type: 'warning',
             message: '新建失败'
           });
         });
       } else {
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
   editDevice(scope) {                         //---------------------编辑操作
     this.dialogEditDevice = true;
     this.editFrom = Object.assign({}, {
       deviceSuffix: scope.row.deviceSuffix,
       deviceType: scope.row.deviceType,
       status: scope.row.status,
       runStatus: scope.row.runStatus,
       id: scope.row.id,
       enterpriseId: scope.row.enterpriseId,
       devicePrefix: scope.row.devicePrefix,
       deviceNo: scope.row.deviceNo,
       importDatetime: scope.row.importDatetime,
       nickName: scope.row.nickName,
       saleDateTime: scope.row.saleDateTime,
       manufacturerId: scope.row.manufacturerId,
       isAdd: scope.row.isAdd
     });
   },
   updateDeviceById() {
     let params = Object.assign({}, this.editFrom);
     updateDevice(params).then((res) => {
       this.dialogEditDevice = false;
       this.getTableData();
       this.$message.info('修改控制器信息成功');
     }).catch((err) => {
       this.$message.error('修改控制器信息失败');
     });
   },
   delDevice(scope) {                         //---------------------删除操作
     this.$confirm('此操作将删除选中项, 是否继续?', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(() => {
       this.removeDevice(scope);
     }).catch(() => {
       this.$message({
         type: 'warning',
         message: '已取消删除'
       });
     });
   },
   removeDevice(scope) {
     const params = {
       id: scope.row.id
     };
     removeDeviceById(params).then((res) => {
       this.getTableData();
       this.$message({
         type: 'info',
         message: '删除成功'
       });
     }).catch((err) => {
       console.log(err);
     })
   },
   getTableData() {

     //---------------------获取列表数据
     let para = {
       enterpriseId: getCookie('orgId'),
       pageNum: this.pagination.current,
       pageSize: this.pagination.pageSize,
       ...this.filter
     };
     getDeviceList(para).then((res) => {
       this.tableData = res.data;
       this.pagination.total = res.data.total;
     });
   },
   //时间格式化
   dateFormat: function (row, column) {
     var date = row.importDatetime;
     if (date == undefined) {
       return "";
     }
     return formatDateTime(date);
   },

 }
