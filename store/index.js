import Vue from 'vue'

import { CancelToken } from 'axios'
import { validPages } from '~/common/api'
import { lazy } from '~/common/utils'

// Learn more on https://nuxtjs.org/guide/vuex-store

// =================================================
// State
// =================================================
export const state = () => {
  const s = {
    items: {
      /* [id: number]: Item */
    },
    users: {
      /* [id: string]: User */
    },
    pages: {
      /* [page: number] : [ [id: number] ] */
    }
  }

  validPages.forEach((page) => {
    s.pages[page] = {}
  })

  return s
}

// =================================================
// Mutations
// =================================================
export const mutations = {
  SET_PAGES: (state, { pages, ids, page }) => {
    Vue.set(state.pages[pages], page, ids)
  },
  SET_ITEM: (state, { item }) => {
    if (item) {
      Vue.set(state.items, item.id, item)
    }
  },
  SET_ITEMS: (state, { items }) => {
    items.forEach((item) => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },
  SET_USER: (state, { id, user }) => {
    Vue.set(state.users, id, user || false) /* false means user not found */
  }
}
// =================================================
// Actions
// =================================================
export const actions = {
  FETCH_PAGES ({ commit, state }, { pages, page, prefetch }) {
    // Don't priorotize already fetched pages
    if (state.pages[pages][page] && state.pages[pages][page].length) {
      prefetch = true
    }
    if (!prefetch) {
      if (this.pagesCancelSource) {
        this.pagesCancelSource.cancel(
          'priorotize pages: ' + pages + ' page: ' + page
        )
      }
      this.pagesCancelSource = CancelToken.source()
    }
    return lazy(
      (items) => {
        const ids = items.map(item => item.id)
        commit('SET_PAGES', { pages: pages, ids, page })
        commit('SET_ITEMS', { items })
      },
      () =>
        this.$axios.$get(`/${pages}?page=${page}`, {
          cancelToken: this.pagesCancelSource && this.pagesCancelSource.token
        }),
      (state.pages[pages][page] || []).map(id => state.items[id])
    )
  },

  FETCH_ITEM ({ commit, state }, { id }) {
    return lazy(
      item => commit('SET_ITEM', { item }),
      () => this.$axios.$get(`/item/${id}`),
      Object.assign({ id, loading: true, comments: [] }, state.items[id])
    )
  },

  FETCH_USER ({ state, commit }, { id }) {
    return lazy(
      user => commit('SET_USER', { id, user }),
      () => this.$axios.$get(`/user/${id}`),
      Object.assign({ id, loading: true }, state.users[id])
    )
  }
}