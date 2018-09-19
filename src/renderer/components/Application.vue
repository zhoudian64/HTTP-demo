<template lang="pug">
div
  el-button(icon="el-icon-arrow-left",
            type="primary",
            circle,
            plain,
            @click="$router.push('/')")
  el-row.application
    el-input(placeholder="请输入本地端口", v-model="port")
    el-button(type="primary",
              plain,
              @click="createServer") 创建本地HTTP服务器
</template>

<script>
const http = require("http");
export default {
  data: () => ({
    port: ""
  }),
  methods: {
    createServer() {
      const port = this.port;
      if (port === "") {
        this.$message({
          message: "请输入端口",
          type: "warning"
        });
      }
      try {
        http
          .createServer((req, res) => {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("HTTP Server enabled!\n");
          })
          .listen(port);
        this.$message({
          message: "HTTP服务器创建成功",
          type: "success"
        });
      } catch (err) {
        this.$message({
          message: "HTTP服务器创建失败",
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.application {
  text-align: center;
  width: 60%;
  margin: 0 auto;
  * {
    margin-top: 15px;
  }
}
</style>
