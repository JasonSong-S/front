<template>
  <div>
    <input type="text" v-model="searchValue" @keyup.enter="search" />
    <div
      class="tags"
      v-for="(item, index) in tagList"
      :key="item.classid"
      @click="select(index)"
    >
      {{ item.name }}
    </div>
    <div
      class="type"
      v-for="item in typeList"
      :key="item.name"
      @click="detail(item.classid)"
    >
      {{ item.name }}
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
  created() {
    console.log(this.recommend());
  },
  methods: {
    search() {
      this.$router.push(`/detail?keyword=${this.searchValue}`);
    },
    recommend() {
      this.$axios({
        url: "/api/class",
        method: "get",
        params: {
          appkey: "c671a4c29ec3381b",
        },
      }).then((res) => {
        this.tagList = res.data.result;
        this.typeList = this.tagList[0].list.splice(0, 10);
      });
    },
    select(index) {
      this.typeList = this.tagList[index].list.splice(0, 10);
    },
    detail(classid) {
      this.$router.push(`/detail?classid=${classid}`);
    },
  },
};
</script>

<style scoped>
input {
  width: 90%;
  margin-left: 5%;
  margin-top: 20px;
}
.tags {
  display: inline-block;
  background-color: aquamarine;
  padding: 10px 10px;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 20px;
}
.type {
  display: inline-block;
  background-color: wheat;
  padding: 30px 30px;
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 20px;
}
</style>