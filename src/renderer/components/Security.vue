<template lang="pug">
div
  el-button(icon="el-icon-arrow-left",
            type="primary",
            circle,
            plain,
            @click="$router.push('/')")
  el-row.certificate
    el-input(placeholder="请输入域名", v-model="domain")
    el-input(placeholder="请输入国家/地区", v-model="country")
    el-input(placeholder="请输入省/市/自治区", v-model="province")
    el-input(placeholder="请输入所在地", v-model="city")
    el-input(placeholder="请输入组织", v-model="organization")
    el-input(placeholder="请输入组织单位", v-model="group")
    el-button(type="primary",
              plain,
              @click="generateCertifacate") 生成自签名证书
    el-input(placeholder="请输入本地端口", v-model="port")
    el-button(type="primary",
              plain,
              @click="createServer") 创建本地HTTPS服务器
</template>

<script>
const https = require("https");

export default {
  data: () => ({
    years: "",
    domain: "",
    country: "",
    province: "",
    city: "",
    organization: "",
    group: "",
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
        const homeDir = this.$os.homedir();
        const pemPkey = this.$fs.readFileSync(homeDir + "/pemPkey.key");
        const pemCert = this.$fs.readFileSync(homeDir + "/pemCert.crt");
        https
          .createServer(
            { key: pemPkey, cert: pemCert, ca: pemCert },
            (req, res) => {
              res.writeHead(200, { "Content-Type": "text/plain" });
              res.end("HTTPS Server enabled!\n");
            }
          )
          .listen(port);
        this.$message({
          message: "HTTPS服务器创建成功",
          type: "success"
        });
      } catch (err) {
        this.$message({
          message: "HTTPS服务器创建失败",
          type: "error"
        });
      }
    },
    generateCertifacate() {
      try {
        const pki = this.$forge.pki;
        const keys = pki.rsa.generateKeyPair(2048);
        const cert = pki.createCertificate();
        cert.publicKey = keys.publicKey;
        cert.serialNumber = "01";
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(
          cert.validity.notBefore.getFullYear() + 1
        );
        const attrs = [
          { name: "commonName", value: this.domain },
          { name: "countryName", value: this.country },
          { shortName: "ST", value: this.province },
          { name: "localityName", value: this.city },
          { name: "organizationName", value: this.organization },
          { shortName: "OU", value: this.group }
        ];
        cert.setSubject(attrs);
        cert.setIssuer(attrs);
        cert.setExtensions([
          {
            name: "basicConstraints",
            cA: true
          },
          {
            name: "keyUsage",
            keyCertSign: true,
            digitalSignature: true,
            nonRepudiation: true,
            keyEncipherment: true,
            dataEncipherment: true
          },
          {
            name: "extKeyUsage",
            serverAuth: true,
            clientAuth: true,
            codeSigning: true,
            emailProtection: true,
            timeStamping: true
          },
          {
            name: "nsCertType",
            client: true,
            server: true,
            email: true,
            objsign: true,
            sslCA: true,
            emailCA: true,
            objCA: true
          },
          {
            name: "subjectAltName",
            altNames: [
              {
                type: 6, // URI
                value: "http://localhost"
              },
              {
                type: 7, // IP
                ip: "127.0.0.1"
              }
            ]
          },
          {
            name: "subjectKeyIdentifier"
          }
        ]);
        cert.sign(keys.privateKey);
        const pemPkey = pki.privateKeyToPem(keys.privateKey);
        const pemCert = pki.certificateToPem(cert);
        const homeDir = this.$os.homedir();
        this.$fs.writeFileSync(homeDir + "/pemPkey.key", pemPkey);
        this.$fs.writeFileSync(homeDir + "/pemCert.crt", pemCert);
        this.$message({
          message: "证书生成成功",
          type: "success"
        });
      } catch (err) {
        this.$message({
          message: "证书生成失败",
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.certificate {
  text-align: center;
  width: 60%;
  margin: 0 auto;
  * {
    margin-top: 15px;
  }
}
</style>
