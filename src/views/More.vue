<template>
  <div class="box">
    <div class="tops" v-if='kkvs'>
      <img :src="'http:' + kkvs.designTemplateImageUrl" alt="" />
    </div>
    <div class="main" v-if='kkvs'>
      <div>{{ kkvs.templateTitle }}</div>
      <p>{{ kkvs.kindTitle }}</p>
      <section>
        图片编号为{{ this.imgss }},该手机海报尺寸是{{ kkvs.width }}*{{
          kkvs.height
        }}点击“立即使用”,《{{
          kkvs.templateTitle
        }}》一键生成,在线编辑图片,简单拖拉拽,秒出精美 手机海报
      </section>
      <ul>
        <li v-for="item in types" :key="item">{{ item }}</li>
      </ul>
    </div>
    <ul class="Rc">
      <p>为你推荐</p>
      <li @click="cKK(item.designTemplateId)" v-for="item in picmore" :key="item.designFirstKindId">
        <img :src="'http:' + item.designTemplateImageUrl" alt="" />
      </li>
    </ul>
    <footer>
        <div><img src="data:image/png;base64,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" alt=""></div>
        <p>立即编辑</p>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //单个图片唯一标识
      imgss: "",
      kkvs: "",
      types: [],
      picmore: [],
    };
  },
  activated(){
      this.imgss = this.$route.params.id;
      this.getcontents();
  },
  methods: {
    async getcontents() {
      let res = await fetch(
        "/yys/designtemplate/getDetailCacheFileUrl.do?_dataType=json&client_type=40&type=2&_dataClientType=3&id=" +
          this.imgss
      ).then((r) => r.json());
      console.log(res.body);
      if(res.body.currentTemplate){
        this.types = res.body.currentTemplate.keywords.split(" ");
      }
      this.picmore = res.body.recommendedTemplates;
      this.kkvs = res.body.currentTemplate;
    },
    cKK(ys){
        this.$router.replace({
            path:`/more/${ys}`
        })
    }
  },
  watch:{
      $route:{
          handler(){
              this.imgss=this.$route.params.id
              this.getcontents()
          },
          deep:true
      }
  }
};
</script>
<style scoped lang='less'>
.box {
  width: 3.75rem;
  padding: 0 0.12rem;
  box-sizing: border-box;
  .tops {
    width: 3.51rem;
    height: 4.53rem;
    background: #e3e6e9;
    border-radius: 0.15rem;
    padding: 0.16rem;
    box-sizing: border-box;
    text-align: center;
    img {
      width: 2.37rem;
      height: 4.2rem;
    }
  }
  .main {
    width: 100%;
    div {
      font-size: 0.18rem;
      font-weight: bolder;
      margin: 0.18rem 0 0.12rem;
    }
    p {
      font-size: 0.13rem;
      color: gray;
      margin: 0.1rem 0;
    }
    section {
      font-size: 0.13rem;
      line-height: 0.3rem;
      margin: 0 0 0.12rem 0;
    }
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li {
        padding: 0 0.16rem;
        box-sizing: border-box;
        line-height: 0.3rem;
        border-radius: 0.15rem;
        background: #dedede;
        font-size: 0.12rem;
        margin: 0 0.1rem 0.1rem 0;
      }
    }
  }
  .Rc {
    width: 100%;
    margin: 0.15rem 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    
    p {
      width: 100%;
      font-size: 0.18rem;
      font-weight: bolder;
      margin: 0.12rem 0 0.16rem;
    }
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
  footer{
      width: 100%;
      height: 0.45rem;
      background: white;
      padding: 0 0.1rem;
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div{
          width: 0.47rem;
          height: 0.47rem;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
              width: 0.22rem;
              height: 0.22rem;
          }
      }
      p{
          width: 2.9rem;
          height: 100%;
          color: white;
          background: #0773fc;
          font-size: 0.15rem;
          text-align: center;
          line-height: 0.45rem;
          border-radius: 0.1rem;
      }
  }
}
</style>