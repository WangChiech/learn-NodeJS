<template>
  <input v-model="count"/>
  <div class="count-str">count: {{ count }}</div>
  <button @click="msg++">{{ msg }}</button>
  <home></home>
  <about></about>
</template>

<script>
import Home from './Home.vue'
import About from './About.vue'

export default {
  components: {
    Home,
    About
  },
  data() {
    return {
      count: 1,
      msg: 10
    }
  },
  mounted() {
    console.log('App mounted', this)
  }
}
</script>

<style scoped>
.count-str {
  height: 100px;
  line-height: 100px;
  display: flex;
  border: 1px solid red;
  border-radius: 5px;
}
</style>