<template>
  <div class="user-view view">
    <template v-if="subPages">
      <lazy-wrapper :loading="subPages.loading">
        <h1>{{ subPages.title }}</h1>
        <span>by {{subPages.user}} {{subPages.time}} days ago</span>
        <p>{{subPages.description}}</p>
      </lazy-wrapper>
    </template>
    <template v-else>
      <h1>Page not found.</h1>
    </template>
  </div>
</template>

<script>
import LazyWrapper from '~/components/LazyWrapper'
export default {
  components: { LazyWrapper },
  fetch () {
    const { pages, subPages } = this.$route.params
    return this.$store.dispatch('FETCH_SUB_PAGES', { pages, subPages })
  },
  computed: {
    subPages () {
      return this.$store.state.subPages[this.$route.params.subPages]
    }
  },
  head () {
    return {
      title: this.subPages ? this.subPages.title : 'Page Not Found'
    }
  }
}
</script>

<style lang="stylus">
.user-view {
  background-color: #fff;
  box-sizing: border-box;
  padding: 2em 3em;
  margin-top: 16px;
  p {
    margin-top: 8px;
    word-break: break-all;
  }
}
</style>