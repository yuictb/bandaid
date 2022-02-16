<template>
  <div class="box" @click.self="store.commit('setBflag',false)">
    <img
      :src="
        'https:' +
        ts.designTemplateThumbUrls[0] +
        '?v=1644565553801&x-oss-process=image/resize,w_300/format,jpg'
      "
      :style="{
        height: (parseInt(ts.height) / parseInt(ts.width)) * 2.4 + 'rem',
      }"
      alt=""
    />
    <div class="collect">
        <section>
            <p :style="{color:ccs}" @click="ttfg" class="iconfont icon-sheji"></p>
            <div>收藏</div>
        </section>
    </div>
  </div>
</template>
<script setup>
import { Toast } from 'vant';
import { ref ,computed} from "vue";
import { useStore } from "vuex";
const store = useStore();
let ts = ref({});
let getgirst = () => {
  ts.value = store.state.item;
};
let ccs=ref('')
let cgh=ref(false)
getgirst();
let ttfg=()=>{
    cgh.value=!cgh.value
    if(cgh.value){
        ccs.value='red'
        Toast('收藏成功,可在我的收藏里查看');
    }else{
        ccs.value=''
        Toast('取消收藏成功');
    }
}
// computed(()=>{
//     show=()=>{
//         return store.state.bbflag
//     }
// })
// let changs=()=>{
//     if(show){
//         document.documentElement.style.overflow='hidden'
//     }else{
//          document.documentElement.style.overflow='auto'
//     }
// }
// changs()
</script> 
<style scoped lang="less">
.box {
  z-index: 99;
  width: 3.75rem;
  height: 6.67rem;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  img {
    width: 2.4rem;
  }
  .collect{
      width: 2.4rem;
      height: 1.17rem;
      padding: 0.3rem 0.3rem 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      section{
          width: 0.5rem;
          height: 0.5rem;
          background: white;
          text-align: center;
          line-height: 0.5rem;
          border-radius: 50%;
          p{
          font-size: 0.3rem;
          }
          div{
              color: white;
          }
      }
      
  }
  .active{
      color: red;
  }
}
</style>