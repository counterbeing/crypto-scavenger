<template>
  <div class="">
      <h1>Unlock {{id}}</h1>
      <p>There are {{shares}} keys total, you have {{shareCount}} of
      {{threshold}} required to unlock the secret.</p>

      <div>{{result}}</div>
  </div>
</template>

<script>

const sss = require('shamirs-secret-sharing')
import uniq from 'lodash/uniq'

export default {
  name: 'parser',
  data() {
    return {
      id: null,
      secret: null,
      shares: 3,
      sharesArray: [],
      threshold: 2,
      share: null,
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.share = this.$route.query.es
    this.shares = this.$route.query.sh
    this.threshold = this.$route.query.th
    // this.extractShareFromQuery()
    this.reconcileShares()
  },
  methods: {
    extractShareFromBase64(b64) {
      const string = decodeURIComponent(atob(b64))
      var uint8array = Buffer.from(JSON.parse(string).data)
      return uint8array
    },
    reconcileShares() {
      let shares = null
      if(localStorage.getItem(this.id)) {
        shares = localStorage.getItem(this.id).split(',')
        shares.push(this.share)
        shares = uniq(shares)
        this.sharesArray = shares
        localStorage.setItem(this.id, shares.join())
      } else {
        localStorage[this.id] = this.share
      }
    }
  },
  computed: {
    shareCount() {
      if(localStorage.getItem(this.id)) {
        return localStorage.getItem(this.id).split(',').length
      } else {
          return 0
        }

    },
    encodedShares() {
      if(this.sharesArray.length < this.threshold) return []
      return this.sharesArray.map((el) => this.extractShareFromBase64(el))
    },
    result() {
      if(this.sharesArray.length < this.threshold) return null
      const shares = this.encodedShares
      console.log(shares)
      const recovered = sss.combine(shares)
      return recovered.toString()
    }
  }
}
</script>
