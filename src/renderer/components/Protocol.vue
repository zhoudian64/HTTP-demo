<template lang="pug">
div.protocol
  el-button(icon="el-icon-arrow-left",
            type="primary",
            circle,
            plain,
            @click="$router.push('/')")
  div.main
    el-input(placeholder="请输入URL",
            v-model="url")
      el-select(placeholder="请选择方法",
                v-model="method",
                slot="prepend",
                style="width:120px")
        el-option(v-for="item in methods",
                  :label="item.name",
                  :value="item.value",
                  :key="item.value")
      el-button(slot="append",
                icon="el-icon-check",
                @click="sendRequest")
  el-row(:gutter="10")
    el-col(:span="12")
      el-card(shadow="hover")
        div(slot="header",
            style="text-align:center") HTTP请求
        div(style="text-align:center")
          el-button(type="text",
                    @click="addRequestHeader") 添加请求头
        el-row(:gutter="10",
                v-for="item in requestHeaders",
                style="margin-top:10px;")
          el-col(:span="12")
            el-input(v-model="item.key",
                    placeholder="请求头的键")
          el-col(:span="12")
            el-input(v-model="item.value",
                    placeholder="请求头的值")
        el-row(style="margin-top:15px;")
          el-input(type="textarea",
                  v-if="showRequest"
                  :rows="10",
                  placeholder="HTTP请求体",
                  v-model="req")
    el-col(:span="12")
      el-card(shadow="hover")
        div(slot="header",
            style="text-align:center") HTTP响应
        el-row(v-for="(value, key) in resposeHeaders"
              :key="key")
          el-col(:span="12") {{key}}
          el-col(:span="12") {{value}}
        el-row(style="margin-top:15px;")
          el-input(type="textarea",
                  :rows="10",
                  placeholder="HTTP响应体",
                  v-model="responseBody",
                  v-if="responseBody!==''")
</template>

<script>
export default {
  data: () => ({
    url: "",
    method: "",
    resposeHeaders: "",
    responseBody: "",
    req: "",
    requestBody: "",
    requestHeaders: [{ key: "Accept", value: "*/*" }],
    methods: [
      { name: "GET", value: "get" },
      { name: "POST", value: "post" },
      { name: "PUT", value: "put" },
      { name: "DELETE", value: "delete" }
    ]
  }),
  methods: {
    addRequestHeader() {
      const emptyHeader = { key: "", value: "" };
      this.requestHeaders.push(emptyHeader);
    },
    clearResult() {
      this.responseBody = "";
      this.resposeHeaders = "";
    },
    checkValue() {
      if (this.method === "post" || this.method === "put") {
        try {
          const req = JSON.parse(this.req);
          this.requestBody = req;
        } catch (err) {
          this.$message({
            message: "请求体的内容只支持JSON",
            type: "warning"
          });
          return false;
        }
      }
      if (this.url === "" || this.method === "") {
        this.$message({
          message: "请选择HTTP方法或者填写URL",
          type: "warning"
        });
        return false;
      } else return true;
    },
    sendRequest() {
      this.clearResult();
      if (!this.checkValue()) {
        return;
      }
      const headers = {};
      for (const item of this.requestHeaders) {
        headers[item.key] = item.value;
      }
      console.log(headers);
      const url = this.url;
      const req = this.requestBody;
      switch (this.method) {
        case "get":
          this.$http
            .get(url, {
              headers
            })
            .then(res => {
              console.log(res);
              this.resposeHeaders = res.headers;
              this.responseBody = String(res.data);
            })
            .catch(err => {
              this.$message({
                message: err.response.status + " " + err.response.statusText,
                type: "error"
              });
            });
          break;

        case "post":
          this.$http
            .post(url, req, {
              headers
            })
            .then(res => {
              console.log(res);
              this.resposeHeaders = res.headers;
              this.responseBody = res.data.data;
            })
            .catch(err => {
              this.$message({
                message: err.response.status + " " + err.response.statusText,
                type: "error"
              });
            });
          break;

        case "put":
          this.$http
            .put(url, req, {
              headers
            })
            .then(res => {
              console.log(res);
              this.resposeHeaders = res.headers;
              this.responseBody = res.data.data;
            })
            .catch(err => {
              this.$message({
                message: err.response.status + " " + err.response.statusText,
                type: "error"
              });
            });
          break;

        case "delete":
          this.$http
            .delete(url, {
              headers
            })
            .then(res => {
              console.log(res);
              this.resposeHeaders = res.headers;
              this.responseBody = String(res.data);
            })
            .catch(err => {
              this.$message({
                message: err.response.status + " " + err.response.statusText,
                type: "error"
              });
            });
          break;

        default:
          break;
      }
    }
  },
  computed: {
    showRequest() {
      return this.method === "post" || this.method === "put" ? true : false;
    }
  }
};
</script>

<style lang="scss">
.protocol {
  .main {
    padding: 10px 0;
  }
  .el-row {
    .el-card {
      height: 100%;
    }
    .el-col {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
