<template>
  <div class="box">
    <div class="stickys">
      <div class="search_ff" @click="router.push('/search')">
        <p class="iconfont icon-sousuo"></p>
        在当前场景下搜索
      </div>
      <Tabs style="position: relative" color="#0773fc" v-model:active="active">
        <img
          @click="typo"
          :style="{ transform: rr }"
          class="topsdf"
          src="../assets/下箭头.png"
          alt=""
        />
        <Tab v-for="item in tages" :title="item.name" :name="item.tagId"></Tab>
      </Tabs>
      <Overlay :show="show" @click="show = false" class="Overl">
        <ul class="tagyys">
          <li
            v-for="item in tages"
            :class="{ yys: active == item.tagId }"
            @click="gty(item.tagId)"
            :key="item.tagId"
          >
            {{ item.name }}
          </li>
        </ul>
      </Overlay>
      <ul class="mmjs">
        <li
          v-for="(item, index) in mmj"
          :class="{ yys: index == p1 }"
          @click="change1(index)"
          :key="item.id"
        >
          {{ item.name }}
        </li>
        <li v-if="!flag2" @click="flag2 = true">筛选</li>
        <li v-if="flag2" @click="flag2 = false">收起</li>
      </ul>
      <ul class="mmjs" v-show="flag2">
        <li
          v-for="(item, index) in mjk"
          :class="{ yys: item.id == p2 }"
          @click="change2(item.id)"
          :key="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <ul class="cont_fy">
      <li
        v-for="item in imgsurl"
        :key="item.designTemplateId"
        @click="jumps(item.designTemplateId)"
        @touchstart.stop="tts(item)"
        @touchend="tuis"
      >
        <img
          :src="
            'https:' +
            item.designTemplateThumbUrls[0] +
            '?v=1644565553801&x-oss-process=image/resize,w_300/format,jpg'
          "
          alt=""
        />
      </li>
    </ul>
    <touchss v-if="this.$store.state.bbflag"></touchss>
  </div>
</template>
<script setup>
import { ref, onActivated, watch, watchEffect } from "vue";
import { mapState, mapMutations, useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { Tab, Tabs, Overlay } from "vant";
const route = useRoute();
const router = useRouter();
const store = useStore();

let tages = ref([]);
let active = ref(0);
let show = ref(false);
let mmj = ref([
  { name: "最热", id: 0 },
  { name: "最新", id: 1 },
  { name: "使用最多", id: 2 },
  { name: "使用最多", id: 3 },
]);
let mjk = ref([
  { name: "全部", id: 0 },
  { name: "免费", id: 2 },
  { name: "付费", id: 3 },
]);
let rr = ref("rotate(0)");
// all imgs url
let imgsurl = ref([]);
let p1 = ref(0);
let p2 = ref(0);
let flag2 = ref(false);

let typo = () => {
  show.value = !show.value;
  if (show.value) {
    rr.value = "rotate(180deg)";
  } else {
    rr.value = "rotate(0)";
  }
};
let change1 = (index) => {
  p1.value = index;
};
let change2 = (d) => {
  p2.value = d;
};
let jumps = (y) => {
  router.push({
    path: `/more/${y}`,
  });
};
let timer = ref("");
let tts = (t) => {
  timer.value = setTimeout(() => {
    console.log("按压");
    store.commit("setBflag", true);
  }, 500);
  store.commit("setItem", t);
};
let tuis = () => {
  clearTimeout(timer.value);
};
onActivated(() => {
  if (!store.state.path) {
    getcontents();
    gettypes();
    show.value = false;
    console.log("数据更新");
  }
});
let gty = (vvf) => {
  active.value = vvf;
  show.value = false;
};
// 获取图片数据
let gettypes = async () => {
  let url = await fetch(
    "/yys/designtemplate/getWxAppTemplateByKindId.do?_dataType=json&client_type=40&fid=0&type=0&page_no=1&sid=" +
      route.params.id +
      "&is_new=1&price_type=" +
      p2.value +
      "&sort_type=" +
      p1.value +
      "&name=%E5%85%A8%E9%83%A8&use_id=" +
      active.value +
      "&_dataClientType=3"
  ).then((r) => r.json());
  let res = await fetch("/pub" + url.body.cacheUrl.split("t.com")[1]).then(
    (r) => r.json()
  );
  if (res.body) {
    imgsurl.value = res.body.templates;
  }
};
let getcontents = async () => {
  let res = await fetch(
    "/yys/home/getDesignType.do?_dataType=json&client_type=40&second_kind_id=" +
      route.params.id +
      "&_dataClientType=3"
  ).then((r) => r.json());
  if (res.body.secondKindInfo.repoTag.use.length) {
    tages.value = res.body.secondKindInfo.repoTag.use;
  } else {
     tages.value=res.body.secondKindInfo.repoTag.style
  }
  tages.value.unshift({ name: "全部", tagId: 0 });
};
watch([active, p1, p2, route.params.id], () => {
  gettypes();
});
</script>
<style scoped lang="less">
.box {
  .stickys {
    width: 3.75rem;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
  }
  width: 3.75rem;
  .search_ff {
    width: 3.5rem;
    height: 0.34rem;
    margin: 0.05rem 0.12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #dedede;
    font-size: 0.13rem;
    border-radius: 0.15rem;
    color: gray;
    p {
      font-size: 0.14rem;
      margin: 0 0.1rem 0 0;
    }
  }
  .Overl {
    margin-top: 0.9rem;
    background: rgba(0, 0, 0, 0.4);
  }
  .tagyys {
    width: 3.75rem;
    padding: 0.16rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    background: white;

    li {
      width: 0.73rem;
      line-height: 0.3rem;
      text-align: center;
      background: #dedede;
      border-radius: 0.15rem;
      font-size: 0.12rem;
      margin: 0 0.1rem 0.1rem 0;
    }
  }
  .topsdf {
    width: 0.24rem;
    height: 0.24rem;
    margin-left: 0.1rem;
    position: absolute;
    transition: all 0.3s;
    right: 0;
    top: 0.08rem;
    background: white;
  }
  .yys {
    background-color: #0773fc !important;
    color: white;
  }
  .mmjs {
    width: 100%;
    background: white;
    margin: 0.1rem 0 0 0;
    display: flex;
    align-items: center;
    li {
      padding: 0 0.13rem;
      box-sizing: border-box;
      line-height: 0.3rem;
      text-align: center;
      background: #dedede;
      border-radius: 0.15rem;
      font-size: 0.12rem;
      margin: 0 0.05rem 0.05rem 0.08rem;
    }
  }
  .cont_fy {
    width: 100%;
    padding: 0 0.1rem;
    margin-top: 1.33rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 1.68rem;
      height: 3rem;
      margin: 0 0 0.15rem 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>