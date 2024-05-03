<template>
  <input v-model="count"/>
  <div>count: {{ count }}</div>
  <button @click="msg++">{{ msg }}</button>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      msg: 10
    }
  }
}
</script>