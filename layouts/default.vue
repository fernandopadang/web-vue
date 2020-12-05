<template>
  <div id="app">
    <header class="header">
      <nav class="inner" role="navigation">
        <router-link to="/" exact>
          <img class="logo" src="~/assets/logo.svg" alt="logo">
        </router-link>
        <router-link v-for="(list, key) in pages" :key="key" :to="`/${key}`">
          {{ list.title }}
        </router-link>
        <a class="github" href="https://fernandopadang.tech" target="_blank" rel="noopener banner">
          fernandopadang
        </a>
      </nav>
    </header>
    <nuxt nuxt-child-key="none" role="main" />
    <footer class="footer">©2020 All Rights Reserved</footer>
  </div>
</template>

<script>
import { pages } from '~/common/api'
export default {
  computed: {
    pages: () => pages
  },
  head () {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host
    return {
      link: [
        { rel: 'canonical', href: `https://${host}${this.$route.path}` }
      ]
    }
  }
}
</script>

<style lang="stylus">
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  background-color: lighten(#eceef1, 30%);
  margin: 0;
  padding: 0;
  color: #2E495E;
  overflow-y: scroll;
}
a {
  color: #2E495E;
  text-decoration: none;
}
.header {
  background-color: #0050b3;
  z-index: 999;
  height: 55px;
  .inner {
    max-width: 800px;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 15px 5px;
  }
  a {
    color: #fff;
    line-height: 24px;
    transition: color 0.15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: 0.075em;
    margin-right: 1.8em;
    &:hover {
      color: #fff;
    }
    &.router-link-active, &.nuxt-link-active {
      color: #fff;
      font-weight: 600;
    }
    &:nth-child(6) {
      margin-right: 0;
    }
  }
  .github {
    color: #fff;
    font-size: 0.9em;
    margin: 0;
    float: right;
  }
}
.logo {
  width: 24px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}
.view {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  min-height: 83.3vh;
}
.appear-active {
  transition: opacity 0.4s ease;
}
.page-enter-active, .page-leave-active {
  transition: all 0.2s ease;
}
.appear, .page-enter, .page-leave-active {
  opacity: 0;
}
footer{
  text-align: center;
    background: #0050b3;
    color: #fbfbfb;
    padding: 16px 0;
    margin-top: 16px;
}
@media (max-width: 860px) {
  .header .inner {
    padding: 15px 30px;
  }
}
@media (max-width: 600px) {
  .header {
    .inner {
      padding: 15px;
    }
    a {
      margin-right: 1em;
    }
    .github {
      display: none;
    }
  }
}
</style>