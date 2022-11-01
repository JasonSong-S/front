<template>
  <div>
    <el-row :gutter="24">
      <el-card class="mt">
        <el-col :span="6">
          <el-card shadow="always" class="in mb">
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
          <el-card shadow="always" class="in">
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
          <el-card shadow="always" class="in">
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
          <el-card shadow="always" class="in">
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
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card class="mt">
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/12 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/3 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/2 20:46</p>
              </el-card>
            </el-timeline-item><el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/2 20:46</p>
              </el-card>
            </el-timeline-item><el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/2 20:46</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="mt">
          <el-calendar v-model="value"></el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { get } from "@/utils/http";
export default {
  data() {
    return {
      value:new Date()
    };
  },
  mounted() {
    this.drawLine();
    this.drawPie();
  },
  methods: {
    async drawLine() {
      const { data } = await get("/line");
      let keys = [];
      let values = [];
      for (let key in data) {
        keys.push(key);
        values.push(data[key]);
      }
      // 容器
      let myCharts = echarts.init(this.$refs.analysis);
      // 配置项
      const option = {
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
    },
    drawPie() {
      let myCharts = echarts.init(this.$refs.percent);
      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      };
      myCharts.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.in {
  background: #4f88ff;
}
.pic {
  height: 50vh;
}
.title {
  text-align: center;
}
</style>