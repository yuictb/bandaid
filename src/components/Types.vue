<template>
  <div class="list_contents">
    <div class="contents_header">
      <p>{{ suis.name }}</p>
      <span @click="juyf(suis.kindId,suis.name)">进入场景</span>
    </div>
    <ul>
      <li v-for="item in suis.templates" :key="item" @click="jump(item)" @touchstart.stop="tts(item)" @touchend="tuis">
        <img
         :style="{height:parseInt(item.height)/parseInt(item.width)*1.2+'rem'}"
         :src="'https:' + item.designTemplateThumbUrls[0]+'?v=1644565553801&x-oss-process=image/resize,w_300/format,jpg'" alt="" />
      </li>
    </ul>
    <main>
      <p @click="juyf(suis.kindId,suis.name)">更多</p>
      <p @click="nextyys(suis.kindid)">换一批</p>
    </main>
  </div>
   
</template>
<script>
export default {
  props: ["suis"],
  data() {
    return {
      page: 1,
      pathys:'',
      timer:''
    };
  },
  methods: {
     tts(r){
        this.timer=setTimeout(()=>{
           console.log('按压');
           this.$store.commit('setBflag',true)
        },500)
        this.$store.commit('setItem',r)
     },
     tuis(){
        clearTimeout(this.timer)
     },

    juyf(a,b){
      this.$router.push({
        // 判断from
        path:`/tfyss/${a}/${b}`
      })
    },
    // 换一批数据
    async nextyys() {
      this.page++;
      let url = await fetch(
        "/yys/designtemplate/getWxAppTemplateByKindId.do?_dataType=json&client_type=40&fid=0&sid=" +
          this.suis.kindId +
          "&page_size=6&page_no=" +
          this.page +
          "&_dataClientType=3"
      ).then((r) => r.json());
      let res = await fetch(
        "/pub" + url.body.cacheUrl.split("kit.com")[1]
      ).then((r) => r.json());
       
      this.suis.templates = res.body.templates;
      this.$emit("update:suis", this.suis.templates);
    },
    jump(fr){
      this.$router.push({
        path:`/more/${fr.designTemplateId}`
      })
    }
  },
};
</script>
<style scoped lang='less'>
.list_contents {
  width: 3.75rem;
  margin-bottom: 0.54rem;
  .contents_header {
    width: 100%;
    height: 0.35rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.1rem;
    box-sizing: border-box;
    p {
      font-size: 0.16rem;
      font-weight: bolder;
    }
    span {
      font-size: 0.12rem;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li {
      width: 1.11rem;
      margin: 0.05rem 0;
      img {
         width: 1.2rem;
         display: block;
      }
    }
  }
  main {
    width: 100%;
    height: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
      width: 1.7rem;
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      background: #dedede;
      border-radius: 0.15rem;
      font-size: 0.13rem;
    }
  }
}
</style>