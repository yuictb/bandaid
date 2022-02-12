<template>
  <router-view></router-view>
  <ul class="bbs_footer">
    <li>
      <router-link to="/">
        <p class="iconfont icon-shouye"></p>
        首页
      </router-link>
    </li>
    <li>
      <router-link to="/design">
        <p class="iconfont icon-sheji"></p>
        我的设计
      </router-link>
    </li>
    <li>
      <router-link to="/mine">
        <p class="iconfont icon-gerenzhongxin"></p>
        个人中心
      </router-link>
    </li>
  </ul>
</template>
<style scoped lang='less'>
.bbs_footer {
  width: 100%;
  height: 0.54rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  li {
    .router-link-exact-active {
      color: aqua;
    }
    width: 0.8rem;
    font-size: 0.12rem;
    text-align: center;
    p {
      font-size: 0.27rem;
    }
  }
}
</style>