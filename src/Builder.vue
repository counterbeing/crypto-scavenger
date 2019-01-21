<template>
    <div class='outer-flex'>
      <div class='flex-left'>
        <h1>Crypto Scavenger</h1>
        <h2>The secret you wish to reveal</h2>
        <p>{{id}}</p>


        <div class='pass-entry'>
          <input type="text" v-model='secret'>
        </div>

      </div>

      <div class='flex-right'>
        <div v-for="url in urls" class="qr-code" :key='url'>
          <qrcode :value="url" size='350'/>
        </div>
        <a @click='print' href="#" class='button no-print'>Print</a>
      </div>
    </div>
</template>

<script>

const sss = require('shamirs-secret-sharing')
import { hri } from 'human-readable-ids'
import QrcodeVue from 'qrcode.vue';


export default {
  name: 'builder',
  components: { qrcode: QrcodeVue},
  data() {
    return {
      id: null,
      secret: null,
      shares: 3,
      threshold: 2,
    }
  },
  mounted() {
    this.id = hri.random()
  },
  watch: {
    secret() {
      this.id = hri.random()
    }
  },
  methods: {
      print() {
        window.print()
      }
  },
  computed: {
    computedShares () {
     if(!this.secret) return []
     return sss.split(this.secret, { shares: this.shares, threshold: this.threshold })
   },
   encodedShares() {
      return this.computedShares.map((el) => {
         let string = JSON.stringify(el)
         return btoa(encodeURIComponent(string))
      })
   },
   urls() {
     return this.encodedShares.map((es) => {
       return [
        'http://sagan.local:8080/',
        '#/parser/',
        '?',
        'id=', this.id,
        '&es=', es,
        '&th=', this.threshold,
        '&sh=', this.shares,
      ].join('')
     })
   }
  }
}
</script>
<style lang='scss'>
@media print {
  .no-print { display: none; }
  .flex-left { display: none; }
  .flex-right {
    flex: none;
    max-width: 100%;
    width: 100%;
  }
  .qr-code {
    display: inline;
    div {
      display: inline;
    }
  }
}
</style>
