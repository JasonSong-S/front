<template>
  <div>
    <h1 v-for="item in resultList" :key="item.id">
      {{ item.name }}

      <p><img :src="item.pic" /></p>
      <h2>介绍：</h2>
      <p class="content" v-html="item.content"></p>
      <h2>材料：</h2>
      <p class="content" v-for="(m, index) in item.material" :key="m.mname">
        {{ index + 1 }}.{{ m.mname }}:{{ m.amount }}
      </p>
      <h2>步骤：</h2>
      <p
        class="content"
        v-for="(m, index) in item.process"
        :key="index"
        v-html="index + 1 + '.' + m.pcontent"
      ></p>
    </h1>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      resultList: [],
    };
  },
  created() {
    this.diet();
  },
  methods: {
    diet() {
      if (this.$route.query.keyword != undefined) {
        this.$axios({
          method: "get",
          url: "/api/search",
          params: {
            keyword: this.$route.query.keyword,
            num: 10,
            appkey: "c671a4c29ec3381b",
          },
        }).then((res) => {
          if (res.data.result == "") {
            Message({ type: "error", message: "没有这道菜" });
            this.$router.push("/");
          } else {
            this.resultList = res.data.result.list;
          }
        });
      } else {
        this.$axios({
          url: "/api/byclass",
          method: "get",
          params: {
            classid: this.$route.query.classid,
            num: 10,
            start: 0,
            appkey: "c671a4c29ec3381b",
          },
        }).then((res) => {
          this.resultList = res.data.result.list;
        });
      }
    },
  },
};
</script>

<style scoped>
.content {
  font-size: 18px;
  font-style: normal;
  font-weight: 200;
}
</style>