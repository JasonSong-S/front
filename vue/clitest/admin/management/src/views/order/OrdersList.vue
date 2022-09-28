<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="mt">
            <el-col :span="6">
                <el-card>
                    <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-card>
            </el-col>
            <el-col :span="6" :offset="12" class="operate">
                <el-button type="primary">新建订单</el-button>
                <el-button :disabled=!select.length @click="operate(1)">审核</el-button>
                <el-button :disabled=!select.length @click="operate(2)">修改</el-button>
                <el-button :disabled=!select.length @click="operate(3)">作废</el-button>
            </el-col>
        </el-row>
        <el-card>
            <el-table
                :data="tableData"
                style="width: 100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                 @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="id" label="订单号" width="180"></el-table-column>
                <el-table-column prop="status" label="状态" width="180">
                    <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">待审核</span>
                    <span v-else-if="scope.row.status == 2">已审核</span>
                    <span v-else-if="scope.row.status == 3">审核通过</span>
                    <span v-else-if="scope.row.status == 4">审核拒绝</span>
                </template>
                </el-table-column>
                
                <el-table-column prop="date" label="下单时间" width="180"></el-table-column>
                <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
                <el-table-column prop="start" label="起始城市" width="180"></el-table-column>
                <el-table-column prop="end" label="目的城市" width="180"></el-table-column>
                <el-table-column prop="cargo" label="货物名称" width="180"></el-table-column>
                <el-table-column prop="count" label="件数" width="180"></el-table-column>
                <el-table-column prop="unit" label="单位" width="180"></el-table-column>
                <el-table-column prop="price" label="运费" width="180"></el-table-column>
                <el-table-column prop="from" label="订单来源" width="180"></el-table-column>
                <el-table-column prop="pay" label="是否支付" width="180">
                    <template slot-scope="scope">
                        {{scope.row.pay==1?"已支付":"未支付"}}
                    </template>
                </el-table-column>
                <el-table-column  label="操作" width="180" fixed="right">
                    <template>
                        <el-button size="mini">编辑</el-button>
                        <el-button type="danger" size="mini">删除</el-button>
                    </template>

                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination
      class="mt mb fr"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</template>

<script>
    import breadcrumb from "@/mixins/breadCrumb"
    'http://localhost:8080/orderList'
    import {post} from "@/utils/http"
    export default {
        mixins:[breadcrumb],
        data(){
            return{
                select:[],
                total:0,
                loading:false,
                searchValue:"",
                tableData:[],
                pageData:{
                    page:1,
                    pageSize:30,
                }
            }
        },
        created(){
            this.loadData();
        },
        methods:{
            async loadData(){
                this.loading = true
                const res = await post("/orderList",{...this.pageData,keyword:this.searchValue})
                this.tableData = res.data.list
                this.total = res.data.total
                this.loading = false

            },
            handleSizeChange(pageSize){
                this.pageData.pageSize = pageSize
                this.loadData()
            },
            handleCurrentChange(page){
                this.pageData.page = page
                this.loadData()

            },
            handleSelectionChange(selection){
                this.select=selection
            },
            operate(type){
                console.log("操作成功"+ type);
                let nos = this.select.map(item=>item.id);
                console.log(nos);
            }
        }
        
        
    }
</script>

<style lang="less" scoped>
.operate{text-align: right;}
</style>