<template>
  <div>
    <el-row :gutter="24">
      <el-card class="mt">
        <el-col :span="6">
          <el-card shadow="hover" class="in mb">
            <div style="float: left">
              <p>本月进件</p>
              <p style="font-weight: bold">6588</p>
              <p>
                +20.12%
                <span style="font-size: 12px">与上月同比</span>
              </p>
            </div>
            <i class="el-icon-tickets ico" style="font-size: 60px"></i>
            <div class="clear"></div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="in">
            <div style="float: left">
              <p>本月进件</p>
              <p style="font-weight: bold">6588</p>
              <p>
                +20.12%
                <span style="font-size: 12px">与上月同比</span>
              </p>
            </div>
            <i class="el-icon-tickets ico" style="font-size: 60px"></i>
            <div class="clear"></div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="in">
            <div style="float: left">
              <p>本月进件</p>
              <p style="font-weight: bold">6588</p>
              <p>
                +20.12%
                <span style="font-size: 12px">与上月同比</span>
              </p>
            </div>
            <i class="el-icon-tickets ico" style="font-size: 60px"></i>
            <div class="clear"></div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="in">
            <div style="float: left">
              <p>本月进件</p>
              <p style="font-weight: bold">6588</p>
              <p>
                +20.12%
                <span style="font-size: 12px">与上月同比</span>
              </p>
            </div>
            <i class="el-icon-tickets ico" style="font-size: 60px"></i>
            <div class="clear"></div>
          </el-card>
        </el-col>
      </el-card>
    </el-row>
    <el-row :gutter="24">
      <el-card class="mt">
        <el-col :span="18">
          <el-card>
            <div slot="header" style="text-align: center; font-size: 24px">
              <span>进件统计分析</span>
            </div>
            <div style="height: 240px" ref="analysis"></div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header" style="text-align: center; font-size: 24px">
              <span>进件统计占比</span>
            </div>
            <div style="height: 240px" ref="percent"></div>
          </el-card>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {get} from "@/utils/http"
export default {
  methods: {
    drawLine() {
       get("/line").then((res)=>{const data = res.data
       
       let keys=[]
       let values=[]
       for (let key in data){
        keys.push(key)
        values.push(data[key])
       }
      let myCharts = echarts.init(this.$refs.analysis);
      const option ={
        xAxis: {
          type: "category",
          data: keys,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: values,
            type: "line",
            smooth: true,
          },
        ],
      };
      myCharts.setOption(option);
       
       })
       
    },
    
  },
  mounted(){
        this.drawLine()
    }
};
</script>

<style lang="less" scoped>
</style>