<template>
  <div class="home">
    <button class="btn" @click="handleClick">click me</button>
    <div>
      <img src="../assets/avatar.png" width="64" height="64" alt="logo" />
      <img src="../assets/todo.png" />
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { asyncPrint } from "../utils";

export default {
  setup() {
    onMounted(() => {
      asyncPrint();
    });

    function handleClick() {
      window.alert("clicked");
      setTimeout(() => {
        console.log("test es6");
      }, 2000);
    }

    return {
      handleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #f00;
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 5px;

  .btn {
    width: 100px;
    font-size: 20px;
    margin: 10px 0;
    color: red;
  }
}
</style>
