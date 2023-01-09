<template>
  <div class="container">
    <input type="text" v-model="searchValue" @keyup.enter="search" class="search-box" placeholder="请输入想要吃的菜名" />
    <span><el-button type="mini" icon="el-icon-search" @click="search">搜索</el-button></span>
    <div class="tag" v-for="(item,index) in tagList" :key="item.classid" @click="select(index)">
      {{ item.name }}
    </div>
    <div class="typecontainer">
      <div class="type" v-for="(item) in typeList" :key="item.classid" @click="detail(item.classid)">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      tagList: [],
      typeList: [],
    };
  },
  methods: {
    search() {
      this.$router.push(`/detail?keyword=${this.searchValue}`)
    },
    recommend() {
      this.$axios({
        url: "/api/class",
        method: "get",
        params: {
          appkey: "c671a4c29ec3381b",
        },
      }).then((res) => {
        console.log(res);
        this.tagList = res.data.result;
        this.typeList = this.tagList[0].list.splice(0,10)
      });
    },
    select(index){
        this.typeList=this.tagList[index].list.splice(0,10)
    },
    detail(classid){
        this.$router.push(`/detail?classid=${classid}`)
    }
  },
  created() {
    this.recommend();
  },
};
</script>

<style scoped>
input {
  width: 50%;
  margin-left: 10%;
  padding: 0;
  
}
.tag{width: 40%;margin-left: 5%;background: rgb(147, 201, 22);display: inline-block;margin: 3%;padding: 2%;text-align: center;}
.type{width: 20%;margin-left: 5%;background: rgb(22, 162, 201);display: inline-block;margin: 3%;padding: 2%;text-align: center;}
.search-box{width: 60%;margin-top: 10%;}

</style>