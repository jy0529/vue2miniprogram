<template>
  <div class="color-red">
    Hello World

    <div v-for="(a, i) in items" :key="a">{{ a }}</div>

    <div @click="clickHandler">clickHandler</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      items: [],
    };
  },
  methods: {
    clickHandler: function() {
      console.log('clicked')
    }
  }
};
</script>

<style>
.color-red {
    color: red;
}
</style>
