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
          <qrcode :value="url" size='200'/>
        </div>
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
  computed: {
    computedShares () {
     if(!this.secret) return []
     return sss.split(this.secret, { shares: this.shares, threshold: this.threshold })
   },
   encodedShares() {
      return this.computedShares.map((el) => {
        const str = new TextDecoder("utf-8").decode(el)
        return encodeURIComponent(btoa(unescape(encodeURIComponent(str))))
      })
   },
   urls() {
     return this.encodedShares.map((es) => {
       return [
        'http://sagan.local:8080/',
        '#/parser/',
        '?',
        'id=', this.id,
        'es=', es,
        'th=', this.threshold,
        'sh=', this.shares,
      ].join('')
     })
   }
  }
}
</script>
