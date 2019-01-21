<template>
  <div class="">
      <h1>parser</h1>
  </div>
</template>

<script>

const sss = require('shamirs-secret-sharing')

export default {
  name: 'parser',
  data() {
    return {
      id: null,
      secret: null,
      shares: 3,
      threshold: 2,
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>
