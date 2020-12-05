<template>
  <div class="view">
    <lazy-wrapper :loading="loading">
      <transition :name="transition" mode="out-in">
        <div :key="displayedPage" class="news-list">
          <transition-group tag="ul" name="item">
            <item v-for="item in displayedItems" :key="item.id" :item="item" />
          </transition-group>
        </div>
      </transition>
      <item-list-nav :pages="pages" :page="page" :max-page="maxPage" />
    </lazy-wrapper>
  </div>
</template>

<script>
import Item from '~/components/Item.vue'
import ItemListNav from '~/components/ItemListNav.vue'
import LazyWrapper from '~/components/LazyWrapper'
import { pages, validPages } from '~/common/api'
export default {
  components: {
    Item,
    ItemListNav,
    LazyWrapper
  },
  validate ({ params: { pages } }) {
    return validPages.includes(pages)
  },
  fetch () {
    const { pages } = this.$route.params
    const { page = 1 } = this.$route.query
    return this.$store.dispatch('FETCH_PAGES', { page: Number(page) || 1, pages: pages })
  },
  data () {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.page) || 1
    }
  },
  computed: {
    pages () {
      return this.$route.params.pages
    },
    page () {
      return Number(this.$route.query.page) || 1
    },
    maxPage () {
      return pages[this.pages].pages
    },
    pageData () {
      return this.$store.state.pages[this.pages][this.page]
    },
    displayedItems () {
      return this.pageData?.map(id => this.$store.state.items[id]) || []
    },
    loading () {
      return this.displayedItems.length === 0
    }
  },
  watch: {
    pages: 'pageChanged',
    page: 'pageChanged'
  },
  mounted () {
    this.pageChanged(this.page)
  },
  methods: {
    pageChanged (to, from = -1) {
      if (to <= 0 || to > this.maxPage) {
        this.$router.replace(`/${this.pages}/1`)
        return
      }
      // Prefetch next page
      this.$store
        .dispatch('FETCH_PAGES', {
          pages: this.pages,
          page: this.page,
          prefetch: true
        })
        .catch(() => {})
      this.transition =
        from === -1 ? null : to > from ? 'slide-left' : 'slide-right'
      this.displayedPage = to
    }
  },
  head () {
    return {
      title: pages[this.$route.params.pages].title
    }
  }
}
</script>

<style lang="stylus">
.news-list {
  background-color: #fff;
  border-radius: 2px;
}
.news-list {
  margin: 10px 0;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}
.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
.item-move, .item-enter-active, .item-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.item-enter {
  opacity: 0;
  transform: translate(30px, 0);
}
.item-leave-active {
  position: absolute;
  opacity: 0;
  transform: translate(30px, 0);
}
@media (max-width: 600px) {
  .news-list {
    margin: 10px 0;
  }
}
</style>