<template>
  <div>
    <bread-crumb :list="this.$route.meta.bread"></bread-crumb>
    <el-card class="mt">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入运单号" v-model="params.waybillNo"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入客户名称" v-model="params.name"></el-input>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            width="100%"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6" class="fr tr">
          <el-button type="primary" @click="loadData">查询</el-button>
          <el-button type="primary">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-radio-group v-model="params.status" class="mt" @change="loadData">
      <el-radio-button label="1">全部运单(300)</el-radio-button>
      <el-radio-button label="2">装货中(120)</el-radio-button>
      <el-radio-button label="3">运输中(70)</el-radio-button>
      <el-radio-button label="4">已完成(100)</el-radio-button>
      <el-radio-button label="5">运单异常(10)</el-radio-button>
    </el-radio-group>
    <el-card class="mt">
      <el-table 
      :data="tableData" 
      v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column
          type="index"
          width="50"
          label="序号"
        ></el-table-column>
        <el-table-column prop="no" label="订单号"></el-table-column>
        <el-table-column prop="date" label="下单时间"></el-table-column>
        <el-table-column prop="name" label="客户名称"></el-table-column>
        <el-table-column prop="cargo" label="货物名称"></el-table-column>
        <el-table-column prop="count" label="件数"></el-table-column>
        <el-table-column prop="start" label="起始城市"></el-table-column>
        <el-table-column prop="end" label="目的城市"></el-table-column>
        <el-table-column prop="price" label="运费"></el-table-column>
        <el-table-column prop="needRecive" label="需要接货"></el-table-column>
        <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
        <el-table-column prop="driver" label="司机"></el-table-column>
        <el-table-column prop="tel" label="司机电话"></el-table-column>
        <el-table-column prop="percent" label="运输进度">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.percent"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="detail(scope.row.no)"
              >详情</el-button>
            <el-button size="mini" type="danger">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import {post} from "@/utils/http"
import moment from "moment"
export default {
  data() {
    return {
      loading:true,
      total:0,
      date: "",
      
      tableData: [],
    
      params:{
        waybillNo:"",
        name:"",
        status: 1,
      },
      pageData:{
        page:1,
         pageSize:10, 
      }

      
    };
  },
  methods:{
    async loadData(){
      this.loading = true
      console.log(this.date);
      let startDate =this.date.length? moment(this.date[0]).format("YYYY-MM-DD"):""
      let endDate =this.date.length? moment(this.date[1]).format("YYYY-MM-DD"):""
        const res =await post("/waybillList",{...this.params,...this.pageData,startDate,endDate})
        this.tableData = res.data.list
        this.total = res.data.total
        this.loading =false

    },
    handleSizeChange(size){
        this.pageData.pageSize =size;
        this.loadData();
    },
    handleCurrentChange(page){
        this.pageData.page =page;
        this.loadData();

    },
    detail(no){
      this.$router.push("/waybill/list/detail?no="+no)
      console.log(this.$router);
    }
  },
  created(){
    this.loadData()
  },
  
  components: {
    BreadCrumb,
  },
  beforeRouteEnter(to,from,next){
    if (from.path =="/waybill/list/detail"){
      to.meta.keepAlive = true
    }else{
      to.meta.keepAlive =false
    }
      next()

  },
};
</script>

<style lang="less" scoped>
</style>