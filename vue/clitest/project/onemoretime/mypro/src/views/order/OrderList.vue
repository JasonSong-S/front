<template>
  <div>
    <bread-crumb :list="$route.meta.bread"></bread-crumb>
    <el-card>
      <el-row>
        <el-col :span="12" :offset="3">
          <el-input placeholder="请输入关键字" v-model="params.keyword">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" class="fr">
          <el-button type="primary" @click="visible=true">新建订单</el-button>
          <el-button :disabled="!selection.length" @click="operate(4)">审核</el-button>
          <el-button :disabled="!selection.length" @click="operate(5)">修改</el-button>
          <el-button :disabled="!selection.length" @click="operate(6)">作废</el-button>
        </el-col>
      </el-row>
    </el-card>
    <order-modal :visible="visible" @hide="hide" @reload="loadData"></order-modal>
    <el-table :data="tableData" style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column type="selection"> </el-table-column>
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="id" label="订单号" width="180"> </el-table-column>
      <el-table-column prop="status" label="订单状态" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">待审核</span>
          <span v-if="scope.row.status == 2">已审核</span>
          <span v-if="scope.row.status == 3">审核通过</span>
          <span v-if="scope.row.status == 4">审核拒绝</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="下单时间"> </el-table-column>
      <el-table-column prop="name" label="客户名称"> </el-table-column>
      <el-table-column prop="start" label="起始城市"> </el-table-column>
      <el-table-column prop="end" label="目的城市"> </el-table-column>
      <el-table-column prop="cargo" label="货物名称"> </el-table-column>
      <el-table-column prop="count" label="件数"> </el-table-column>
      <el-table-column prop="unit" label="单位"> </el-table-column>
      <el-table-column prop="price" label="运费"> </el-table-column>
      <el-table-column prop="from" label="订单来源"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
      
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="fr mt mb">
    </el-pagination>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import OrderModal from "./OrderModal.vue"
import { post } from "@/utils/http";
import {mapMutations} from "vuex"
export default {
  components: {
    BreadCrumb,OrderModal
  },
  data() {
    return {
      tableData: [],
      visible:false,
      selection:[],
      params:{
        page:3,
        pageSize:10,
        keyword:""
      },
      total:0
    };
  },
  methods: {
    loadData() {
      post("/orderList",this.params).then((res) => {
        this.tableData = res.data.list;
        this.total=res.data.total
      });
    },
    ...mapMutations(["setRow"]),
    edit(row) {
      this.setRow(row)
      this.visible = true
    },
    handleDelete(index) {
      console.log(index);
    },
    handleSelectionChange(val){
        this.selection = val
    },
    operate(val){
        console.log(val);
    },
    handleSizeChange(pageSize){
      this.params.pageSize = pageSize
      this.loadData()
    },
    handleCurrentChange(page){
      this.params.page = page,
      this.loadData()
    },
    hide(){
      this.visible =false
    }
  },

  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
</style>