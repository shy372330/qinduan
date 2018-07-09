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
          <el-button @click='dialogGetMaxNo=true' type='primary'>查询最大号</el-button>
        </el-row>
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="batchCreat"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
				<div style='margin-bottom: 20px'>
					<el-table :data='tableData' width='100%' border>
						<el-table-column type='index' width='65' align="center"></el-table-column>
						<el-table-column label='控制器编号' prop='deviceSuffix' width='150' align="center"></el-table-column>
						<el-table-column label='控制器类型' prop='deviceType' width='150'align="center"></el-table-column>
						<el-table-column label='运行状态' prop='runStatus' width='100'align="center">  </el-table-column>
						<el-table-column label='销售状态' prop='status' width='100'align="center"></el-table-column>
						<el-table-column label='导入时间' prop='importDatetime'  width='150'align="center"></el-table-column>
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
    <el-dialog title='查询最大编号' size='large' ref='createQr' v-model='dialogGetMaxNo' style="width:800px;padding: 50px;marginLeft:400px;">
      <div style='padding: 20px 50px'>
        <el-form label-width='100px' ref='deviceNoForm' :model='deviceNoForm'>
          <el-row type='flex' justify='space-between'>
            <el-col :span='11'>
              <el-form-item
                label='请输入地区'
                prop='startNum'
                required
                :rules='{
								      	required: true, message: "地区编号不能为空！"
								    }'
              >
                <el-input v-model='deviceNoForm.startNum' :maxlength='50'></el-input>
              </el-form-item>
            </el-col>
            <el-col  :span='11'>
              <el-form-item
                label='客户编号'
                prop='endNum'
                required
                :rules='{
								      	required: true, message: "客户编号不能为空！"
								    }'
              >
                <el-input v-model='deviceNoForm.endNum' :maxlength='50'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row type='flex' justify='end'>
          <el-button @click='handleCloseAddDialog'>取消</el-button>
          <el-button type='info' @click='handleSaveQr'>查询</el-button>
        </el-row>
      </div>
    </el-dialog>
	</div>

</template>
<script type="text/javascript">

    import methods from './method'
    import data from './data'

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
