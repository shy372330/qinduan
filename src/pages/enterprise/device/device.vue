<template>
	<div style="padding: 20px;">
        <!-- -------------------------------------------查询条件--------------------------------------------- -->
		<el-collapse v-model='activeCollapse'>
			<el-collapse-item title='查询条件' name='search'>
				<el-form ref='searchCondition' :model='filter' label-width='80px' label-position=‘left’>
					<el-row>
						<el-col :span='6'>
							<el-form-item label='名称' prop='className'>
								<el-input v-model='filter.className' :clearable='true' placeholder="请输入控制器名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6' style="marginLeft:20px;">
                            <el-button @click='handleSearch' type='primary'>查询</el-button>
					        <el-button @click='resetForm("searchCondition")'>重置</el-button>
						</el-col>
					</el-row>
				</el-form>
			</el-collapse-item>
		</el-collapse>
		<!-- -------------------------------------------控制器列表--------------------------------------------- -->
			<div>
				<el-row type='flex' justify='begin'  style='margin: 20px 0 10px 0'>
					<el-button @click='dialogCreateQr=true' type='primary'>生成二维码</el-button>
          <el-button @click='dialogCreateDevice=true' type='primary'>新建控制器</el-button>
				</el-row>

				<div style='margin-bottom: 20px'>
					<el-table :data='tableData' width='100%' border>
						<el-table-column type='index' width='65' align="center"></el-table-column>
						<el-table-column label='控制器编号' prop='deviceSuffix' width='150' align="center"></el-table-column>
						<el-table-column label='控制器类型' prop='deviceType' width='150'align="center"></el-table-column>
						<el-table-column label='运行状态' prop='runStatus' width='100'align="center">
              <template scope="scope">
                {{ scope.row.runStatus==1 ? '已运行' : '未运行' }}
              </template>
            </el-table-column>
						<el-table-column label='销售状态' prop='status' width='100'align="center" >
              <template scope="scope">
                {{ scope.row.status==1 ? '已销售' : '未销售' }}
              </template>
            </el-table-column>
						<el-table-column label='导入时间' prop='importDatetime' :formatter="dateFormat"  width='250'align="center">
              <!--<template scope="scope">
                {{ scope.row.importDatetime=scope.row.importDatetime }}
              </template>-->
            </el-table-column>
						<el-table-column label='操作' width='200' prop='operate'align="center">
							<template scope="scope">
						        <el-button @click="editDevice(scope)" type="button" size="primary">编辑</el-button>
						        <el-button @click="delDevice(scope)" type="danger" size="primary">删除</el-button>
						    </template>
						</el-table-column>
					</el-table>
				</div>

				<el-row type='flex' justify='end'>
					<el-pagination
						@size-change='handlePageSizeChange'
						@current-change='handleCurrentChange'
						:current-page='pagination.current'
						:page-sizes='[10, 20, 50, 100]'
						:page-size='pagination.pageSize'
						:total='pagination.total'
						layout='prev,pager,next,jumper,total,sizes'
					></el-pagination>
				</el-row>
			</div>
			<!-- -------------------------------------------------新建控制器----------------------------------------------- -->
			<el-dialog title='新建控制器' size='large' ref='createClass' v-model='dialogCreateDevice' style="width:800px;padding: 50px;marginLeft:400px;">
				<div style='padding: 20px 50px'>
					<el-form label-width='100px' ref='addClassForm' :model='classFrom'>
						<el-row type='flex' justify='space-between'>
							<el-col :span='11'>
								<el-form-item
									label='企业名称'
									prop='enterpriseId'
									required
									:rules='{
								      	required: true, message: "企业名称不能为空！"
								    }'
								>
									<el-input v-model='classFrom.enterpriseId' :maxlength='50'></el-input>
								</el-form-item>
							</el-col>
							<el-col  :span='11'>
								 <el-form-item
									label='控制器编号'
									prop='deviceId'
									required
									:rules='{
								      	required: true, message: "控制器编号不能为空！"
								    }'
								>
									<el-input v-model='classFrom.deviceId' :maxlength='50'></el-input>
								</el-form-item>
							</el-col>
						</el-row>

					</el-form>
					<el-row type='flex' justify='end'>
						<el-button @click='handleCloseAddDialog'>取消</el-button>
						<el-button type='info' @click='handleSave'>保存</el-button>
					</el-row>
				</div>
			</el-dialog>
    <!-- -------------------------------------------------二维码生成----------------------------------------------- -->
    <el-dialog title='生成二维码' size='large' ref='createQr' v-model='dialogCreateQr' style="width:800px;padding: 50px;marginLeft:400px;">
      <div style='padding: 20px 50px'>
        <el-form label-width='100px' ref='deviceNoForm' :model='deviceNoForm'>
          <el-row type='flex' justify='space-between'>
            <el-col :span='11'>
              <el-form-item
                label='起始编号'
                prop='startNum'
                required
                :rules='{
								      	required: true, message: "起始编号不能为空！"
								    }'
              >
                <el-input v-model='deviceNoForm.startNum' :maxlength='50'></el-input>
              </el-form-item>
            </el-col>
            <el-col  :span='11'>
              <el-form-item
                label='结束编号'
                prop='endNum'
                required
                :rules='{
								      	required: true, message: "结束编号不能为空！"
								    }'
              >
                <el-input v-model='deviceNoForm.endNum' :maxlength='50'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row type='flex' justify='end'>
          <el-button @click='handleCloseAddDialog'>取消</el-button>
          <el-button type='info' @click='handleSaveQr'>确认生成</el-button>
        </el-row>
      </div>
    </el-dialog>
			<!-- -------------------------------------------------编辑控制器----------------------------------------------- -->
			<el-dialog title='编辑控制器' size='large' ref='editDevice' v-model='dialogEditDevice' style="width:800px;padding: 50px;marginLeft:400px;">
				<div style='padding: 20px 50px'>
					<el-form label-width='100px' ref='editFrom' :model='editFrom'>
						<el-row type='flex' justify='space-between'>
							<el-col :span='11'>
								<el-form-item
									label='控制器编号'
									prop='deviceSuffix'
									required
									:rules='{
								      	required: true, message: "控制器编号不能为空！"
								    }'
								>
									<el-input v-model='editFrom.deviceSuffix' :maxlength='50'></el-input>
								</el-form-item>
							</el-col>
							<el-col  :span='11'>
								 <el-form-item
									label='控制器类型'
									prop='deviceType'
									required
									:rules='{
								      	required: true, message: "控制器类型不能为空！"
								    }'
								>
									<el-input v-model='editFrom.deviceType' :maxlength='50'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row type='flex' justify='space-between'>
							<el-col :span='11'>
								<el-form-item
									label='运行状态'
									prop='runStatus'
									required
									:rules='{
								      	required: true, message: "运行不能为空！"
								    }'
								>
									<el-input v-model='editFrom.runStatus' :maxlength='50'></el-input>
								</el-form-item>
							</el-col>
							<el-col  :span='11'>
								 <el-form-item
									label='销售状态'
									prop='status'
									required
									:rules='{
								      	required: true, message: "销售状态不能为空！"
								    }'
								>
									<el-input v-model='editFrom.status' :maxlength='128'></el-input>
								</el-form-item>
							</el-col>
						</el-row>

					</el-form>
					<el-row type='flex' justify='end'>
						<el-button @click='handleCloseEditDialog'>取消</el-button>
						<el-button type='info' @click='updateDeviceById'>保存</el-button>
					</el-row>
				</div>
			</el-dialog>
	</div>
</template>
<script type="text/javascript">

    import methods from './method'
    import data from '../data'

	export default{
		data(){
			return data.init();
		},
		methods: methods,
		mounted(){
			this.getTableData();
		}
	}
</script>
<style type="text/css">
</style>
