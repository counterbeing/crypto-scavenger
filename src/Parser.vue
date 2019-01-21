<template>
  <div class="">
      <h1>parser {{id}}</h1>
      <pre>
        {{sharesArray}}
      </pre>
      result: {{result}}
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
      // const decoded = decodeURIComponent(b64)
      // const bString = decodeURIComponent(atob(decoded))
      // const te = new TextEncoder
      // return Buffer.from(te.encode(bString),'utf8');
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
    encodedShares() {
      if(this.sharesArray.length < this.shares) return []
      return this.sharesArray.map((el) => this.extractShareFromBase64(el))
    },
    result() {
      if(this.encodedShares.length < this.shares) return null
      console.log(this.encodedShares)
      const shares = this.encodedShares
      const recovered = sss.combine(shares)
      return recovered.toString()
    }
  }
}
</script>
