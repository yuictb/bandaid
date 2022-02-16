<template>
  <div class="box">
    <ul v-for="item in list" :key="item.id">
      <h3>{{ item.title }}</h3>
      <li v-for="items in item.templates" :key="item.designTemplateId">
        <img alt="" :src="'https:' + items.designTemplateImageUrl" />
      </li>
      <section @click="yui(item.id)">查看更多</section>
    </ul>
  </div>
</template>
<script setup>
import { ref, onActivated, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
let ids = ref("");
let list = ref({});
let jkf = ref(1);
let getfirst = async () => {
  let res = await fetch(
    "/v2/solutionSubject/themeDetail.do?_dataType=json&_dataClientType=3&client_type=40&themeId=" +
      route.params.id +
      "&templatePageSize"
  ).then((r) => r.json());
  if (res.body.data.theme) {
    ids.value = res.body.data.theme.id;
    list.value = res.body.data.theme.themeExtends;
  }
};
onActivated(() => {
  getfirst();
});

let yui= async (a)=>{
     jkf.value++
     let res=await fetch('/v2/solutionSubject/themeExtend/template.do?_dataType=json&_dataClientType=3&client_type=40&themeExtendId='+a+'&pageSize=6&pageNum='+jkf.value).then(r=>r.json())
     console.log(res);
}
</script>
<style scoped lang="less">
.box {
  width: 3.75rem;
  ul {
    h3 {
      width: 100%;
      text-align: center;
      margin: 0.1rem 0;
    }
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li {
      width: 1.08rem;
      margin: 0.07rem 0;
      img {
        width: 100%;
      }
    }
    section {
      width: 1.5rem;
      height: 0.4rem;
      background: #dedede;
      color: gray;
      font-size: 0.13rem;
      border-radius: 0.15rem;
      text-align: center;
      line-height: 0.4rem;
      margin: 0.15rem 0;
    }
  }
}
</style>