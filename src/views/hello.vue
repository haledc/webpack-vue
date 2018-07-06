<template>
  <div class="hello">
    <p @click="handleClick">click me</p>
    <div>
      <img src="../assets/avater.png"/>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        window.alert('clicked')
        setTimeout(() => {
          console.log('test es6')
        }, 2000)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .hello
    color #f00
    width 300px
    height 200px
    background aqua
    display flex
    box-sizing border-box
    padding 5px
</style>
