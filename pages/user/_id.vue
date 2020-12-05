<template>
  <div class="user-view view">
    <template v-if="user">
      <h1>User : {{ user.id }}</h1>
      <lazy-wrapper :loading="user.loading">
        <ul class="meta">
          <li>
            <span class="label">Created:</span> {{ user.created_time | timeAgo }} ago
          </li>
          <li>
            <span class="label">Karma:</span> {{ user.karma || '-' }}
          </li>
          <li v-if="user.about" class="about" v-html="user.about" />
        </ul>
      </lazy-wrapper>
      <p class="links">
        <a :href="'' + user.id">submissions</a> |
        <a :href="'' + user.id">comments</a>
      </p>
    </template>
    <template v-else>
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>
import LazyWrapper from '~/components/LazyWrapper'
export default {
  name: 'UserView',
  components: { LazyWrapper },
  fetch () {
    const { id } = this.$route.params
    return this.$store.dispatch('FETCH_USER', { id })
  },
  computed: {
    user () {
      return this.$store.state.users[this.$route.params.id]
    }
  },
  head () {
    return {
      title: this.user ? this.user.id : 'User not found'
    }
  }
}
</script>

<style>
.user-view {
  background-color: #fff;
  box-sizing: border-box;
  padding: 2em 3em;
}
</style>