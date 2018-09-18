<template lang="pug">
  div.index
    h2 计算机网络研讨
    el-button(type="primary",
              plain,
              v-for="item in navs",
              :key="item.link"
              @click="$router.push(item.link)") {{item.name}}
    //- h3 段 靖 余德全 余俊昭
</template>

<script>
export default {
  data: () => ({
    navs: [
      { name: "HTTP协议组成", link: "/protocol" },
      { name: "HTTPS协议认识", link: "/security" },
      { name: "HTTP协议应用", link: "/application" }
    ]
  }),
  methods: {}
};
</script>

<style lang="scss">
.index {
  height: 100%;
  padding: 20vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .el-button {
    margin: 20px auto;
    width: 300px;
  }
}
</style>
