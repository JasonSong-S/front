<template>
  <div>
    <bread-crumb :list="this.$route.meta.bread"></bread-crumb>
    <el-card class="mt">
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="params.keywords">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" :offset="10">
          <el-button type="primary" @click="visible=true">新建订单</el-button>
          <el-button :disabled="!selection.length" @click="operate(1)">审核</el-button>
          <el-button :disabled="!selection.length" @click="operate(2)">修改</el-button>
          <el-button :disabled="!selection.length" @click="operate(3)">作废</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="id" label="订单号" width="100"></el-table-column>
        <el-table-column prop="status" label="订单状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">待审核</span>
            <span v-if="scope.row.status == 2">已审核</span>
            <span v-if="scope.row.status == 3">审核通过</span>
            <span v-if="scope.row.status == 4">审核拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="下单时间"></el-table-column>
        <el-table-column prop="name" label="客户名称"></el-table-column>
        <el-table-column prop="start" label="起始城市"></el-table-column>
        <el-table-column prop="end" label="目的城市"></el-table-column>
        <el-table-column prop="cargo" label="货物名称"></el-table-column>
        <el-table-column prop="count" label="件数"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="price" label="运费"></el-table-column>
        <el-table-column prop="from" label="订单来源"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <order-model :visible="visible" @close="visible=false" @reload="loadData"></order-model>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import OrderModel from "@/views/order/OrderModel"
import { post } from "@/utils/http";
import { mapMutations } from 'vuex'
export default {
  components: { BreadCrumb,OrderModel },
  data() {
    return {
      visible:false,
      loading: false,
      tableData: [],
      params: {
        page: 1,
        pageSize: 10,
        keywords: "",
      },
      total:0,
      selection: [],
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      post("/orderList", this.params).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total
        this.loading = false;
        console.log(res);
      });
    },
    handleSelectionChange(selection) {
      this.selection = selection;
    },
    handleSizeChange(size){
        this.params.pageSize =size;
        this.loadData();
    },
    handleCurrentChange(page){
        this.params.page =page;
        this.loadData();

    },
    operate(type){
        console.log(type);
        let nos = this.selection.map(item=>item.id)
        this.$notify({
            title:"操作成功",
            message:nos,
            type:"success"
        })
    },
    ...mapMutations(["setRow"]),
    edit(row){
      this.setRow(row)
      this.visible = true
    }
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
</style>