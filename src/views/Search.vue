<template>
  <div class="box">
    <div class="header">
      <div>
        <p class="iconfont icon-sousuo"></p>
        <input type="text" placeholder="200000+免费模板任你搜索" />
        <img @click="pics" v-if="pflag" src="../assets/叉叉.png" alt="" />
      </div>
      <span @click="router.push('/')">取消</span>
    </div>
    <div class="search_oos" v-if="Sflag">
      <p>热门搜索</p>
      <ul>
        <li
          @click="dianji(item.keyword)"
          v-for="item in ttys"
          :key="item.templateCount"
        >
          {{ item.keyword }}
        </li>
      </ul>
    </div>
    <Tabs color="#0773fc" v-model:active="active" v-if="pflag">
      <Tab
        v-for="item in ggf"
        :title="item.kindTitle"
        :name="item.kindId"
        :key="item.kindId"
      ></Tab>
    </Tabs>
    <div class="bbsf" v-if="pflag">
      <p>{{contact}}个模板</p>
      <main>
        <span @click="rio">最热</span> 
        <p>|</p>
        <span @click="rio2">最新</span>
      </main>
    </div>
    <ul class="vvfsr">
      <li v-for="item in qlist" :key="item.designTemplateId">
         <img class="img1" :src="'https:'+item.designTemplateThumbUrls[0]" alt="">
      </li>
      <li v-for="item in qlist2" :key="item.designTemplateId">
         <img class="img1" :src="'https:'+item.designTemplateThumbUrls[0]" alt="">
      </li>
    </ul>
  </div>
</template>
<script setup>
import { Namespaces } from "@vue/compiler-core";
import { Tab, Tabs } from "vant";
import { ref ,watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
let ttys = ref([]);
let ggf = ref([]);
let pflag = ref(false);
let Sflag = ref(true);
let active = ref(0);
let contact=ref()
let imgsList=ref([])
let hotornew=ref(0)
let q1=ref(0)
let q2=ref(0)
let qlist=ref([])
let qlist2=ref([])
let namespaces=ref('')
let rio=()=>{
   hotornew.value=0
}
let rio2=()=>{
    hotornew.value=1
}
let tpost = async () => {
  let res = await fetch(
    "/v2/designkind/getDesignKindBasicInfo.do?_dataType=json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `client_type=40&type=2&_dataClientType=3`,
    }
  ).then((r) => r.json());
  ggf.value = res.body.data.secondLabel;
  ggf.value.unshift({ kindTitle: "全部", kindId: 0 });
};
tpost();
let gettypes = async () => {
  let res = await fetch(
    "/v2/template/getRecommendKeyword.do?_dataType=json"
  ).then((r) => r.json());
  ttys.value = res.body.data;
};
gettypes();
let dianji=(item)=>{
  getss(item)
  namespaces.value=item
}
let getss = async (t) => {
  Sflag.value = false;
  pflag.value = true;
  let res = await fetch("/v2/template/wxSmallAppSearch.do?_dataType=json", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `client_type=40&pageNo=1&pageSize=20&kw=${t}&second_kind_id=${active.value}&time_order=${hotornew.value}&use_times_order=0&collection_times_order=0&_dataClientType=0`,
  }).then((r) => r.json());
   let ri=res.body
   contact.value=ri.totalCount
   imgsList.value=ri.templates
   console.log(imgsList.value);
   imgsList.value.forEach(item => {
       if(q1.value>q2.value){
           qlist.value.push(item)
           q2.value+=parseInt(item.height)
       }else{
          qlist2.value.push(item)
          q1.value+=parseInt(item.height)
       }
   });

};
let pics = () => {
  (pflag.value = false);
   (Sflag.value = true);
};
 watch([active,hotornew],()=>{
    dianji(namespaces.value)
    console.log('11');
 })
</script>
<style scoped lang="less">
.box {
  width: 3.75rem;

  .header {
    width: 100%;
    height: 0.44rem;
    padding: 0.05rem 0.12rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      width: 3.14rem;
      height: 100%;
      padding: 0 0.2rem;
      box-sizing: border-box;
      background: #dedede;
      border-radius: 0.15rem;
      display: flex;
      align-items: center;
      p {
        margin: 0 0.1rem 0 0;
      }
      input {
        font-size: 0.12rem;
        width: 2.8rem;
        height: 100%;
        border: none;
        outline: none;
        background: #dedede;
      }
      img {
        width: 0.15rem;
        height: 0.15rem;
      }
    }
    span {
      font-size: 0.12rem;
    }
  }
  .search_oos {
    width: 3.75rem;
    padding: 0.19rem 0.12rem 0;
    box-sizing: border-box;
    p {
      width: 100%;
      font-size: 0.14rem;
      margin: 0 0 0.15rem 0;
    }
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li {
        font-size: 0.12rem;
        line-height: 0.3rem;
        padding: 0 0.12rem;
        margin: 0 0.1rem 0.1rem 0;
        box-sizing: border-box;
        background: #dedede;
        border-radius: 0.15rem;
      }
    }
  }
  .bbsf{
      width: 100%;
      height: 0.57rem;
      padding: 0 0.1rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      main{
          display: flex;
          align-items: center;
          font-size: 0.12rem;
          p{
              margin: 0 0.1rem;
          }
      }
  }
  .vvfsr{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .img1{
       width: 1.7rem;
    }
  }
}
</style>