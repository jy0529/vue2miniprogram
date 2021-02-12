<template>
  <div class="color-red">
    Hello World

    <div v-for="(a, i) in items" :key="a">{{ i }}</div>

    <div @click="clickHandler"></div>
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
};
</script>

<style>
.color-red {
    color: red;
}
</style>
