<template lang="pug">
  div#app(v-loading="loading")
    main#wrapper
      router-view
</template>

<script>
export default {
  data: () => ({ loading: false }),
  methods: {
    setLoading() {
      this.loading = !this.loading;
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Lucida Console", Monaco, "Courier New", mono, monospace;
  // font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  //   Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
body {
  min-height: 100vh;
}

#app {
  height: 100%;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  min-height: 100vh;
  width: 100vw;
  padding: 20px;
}

.center {
  text-align: center;
}
</style>
