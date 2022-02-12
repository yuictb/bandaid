<template>
  <div class="box">
    <div class="header" @click="$router.push('search')">
      <div class="search_box">
        <p class="iconfont icon-sousuo"></p>
        <span>200000+免费模板任你搜索</span>
      </div>
    </div>
    <ul class="midd_list" v-if="apf.scene">
      <li
        class="list_item"
        v-for="item in apf.scene.slice(0, 8)"
        :key="item.designKindId"
      >
        <router-link to="/ays">
          <img :src="'https:' + item.thumbUrl" alt="" />
          <p>{{ item.name }}</p>
        </router-link>
      </li>
    </ul>
    <div class="middle_bar">
      <p>推荐专题</p>
      <ul class="turn_left">
        <li class="left_rrr" v-for="(item, index) in avvs">
          <div>{{ item.title }}</div>
          <main>{{ item.themeDescribe }}</main>
          <section :style="{ background: colors[index] }"></section>
        </li>
      </ul>
    </div>
    <template v-for="(item, index) in suis" :key="item.id">
      <types
        v-if="suis.length"
        :suis="item"
        :index="index"
        @update:suis="topse"
      ></types>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 初始调用数据
      apf: "",
      // 滑动数据
      avvs: [],
      // 渲染数据
      suis: [],
      colors: [
        "#ff406c",
        "#ffc11b",
        "#00cb47",
        "#c86efd",
        "#3BA9FF",
        "#FF406C",
      ],
      page: 1,
      fys: 1,
      flag:true
    };
  },
  created() {
    this.getfirst();
    this.onloadss()
    
  },
  methods: {
    // 自定义事件 子组件传值
    topse(g) {
      this.suis.templates = g;
    },
    async getfirst() {
      let res = await fetch(
        "/v2/mobile/main/getMainMiniProgramHomeInfo.do?_dataType=json&_dataClientType=3&client_type=40"
      ).then((r) => r.json());
      // console.log(res);
      this.apf = res.body.data;
      this.suis = res.body.data.sceneDetails.sceneDetail;
      this.getavvs();
    },
    // X向数据
    async getavvs() {
      let res = await fetch(
        "/v2/solutionSubject/theme.do?_dataType=json&_dataClientType=3&client_type=40&solutionSubjectId=1&pageNum=1&pageSize=6&templatePageSize=6&type=3&device=2"
      ).then((r) => r.json());
      this.avvs = res.body.data.themes;
    },
     //  触底加载
    onloadss(){
      window.onscroll= () => {
        let st = document.documentElement.scrollTop || document.body.scrollTop;
        let H = window.innerHeight;
        let h = document.body.offsetHeight;
        if (H + st >h-200&&this.flag) {
           this.fys++;
           this.flag=false
        }
      };
    },
     async getfonter(){
       let res=await fetch('/v2/mobile/main/getSceneDetail.do?_dataType=json&_dataClientType=3&client_type=40&page_no='+this.fys).then(r=>r.json())
       this.suis.push(...res.body.data.sceneDetail)
        this.flag=true;
        if(this.suis.length>=res.body.data.totalCount){
           this.flag=false
        }
         
     }
  },
  watch:{
    fys(){
       this.getfonter()
    }
  }
};
</script>
<style scoped lang='less'>
.box {
  width: 3.75rem;
  .header {
    width: 100%;
    height: 0.54rem;
    padding: 0.1rem 0;
    box-sizing: border-box;
    .search_box {
      width: 3.51rem;
      height: 0.34rem;
      margin: 0 0.12rem;
      background: #f3f4f4;
      border-radius: 0.15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        font-size: 0.13rem;
        margin-right: 0.1rem;
      }
      span {
        font-size: 0.13rem;
        color: gray;
      }
    }
  }
  .midd_list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .list_item {
      width: 0.8rem;
      height: 0.88rem;
      text-align: center;
      margin: 0.05rem;
      img {
        width: 0.55rem;
        height: 0.55rem;
      }
      p {
        font-size: 0.12rem;
        width: auto;
      }
    }
  }
  .middle_bar {
    width: 100%;
    height: 1.58rem;
    padding: 0 0.12rem;
    box-sizing: border-box;
    p {
      font-size: 0.16rem;
      padding: 0.3rem 0 0.2rem;
      box-sizing: border-box;
      font-weight: bolder;
    }
    // 消除滚动条
    .turn_left::-webkit-scrollbar {
      display: none;
    }
    .turn_left {
      width: 100%;
      height: 0.7rem;
      overflow: auto hidden;
      white-space: nowrap;
      .left_rrr {
        width: 1.04rem;
        height: 0.6rem;
        background: white;
        border-radius: 0.1rem;
        display: inline-block;
        margin: 0 0.1rem 0 0;
        padding: 0 0.1rem 0 0.1rem;
        box-sizing: border-box;
        text-overflow: wllipsis;
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        div {
          font-size: 0.13rem;
          font-weight: bolder;
          margin: 0.08rem 0;
        }
        main {
          font-size: 0.12rem;
        }
        section {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          position: absolute;
          bottom: -0.25rem;
          right: -0.25rem;
        }
      }
    }
  }
}
</style>
