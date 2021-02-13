<template>
  <div style="color: red; font-size:12px;" >
    <div @click="addCount"> count:  {{count}} </div>

    <div style="color: blue;" @click="addCount">add count</div>
  </div>
</template>

<script>
export default {
  name: 't',
  data () {
    return {
      count: 0
    }
  },
  methods: {
    addCount () {
      this.count++
    },
    console () {
      console.log('console')
    }
  }
}
</script>

<style>

</style>
