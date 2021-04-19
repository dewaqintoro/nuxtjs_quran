<template>
  <div class="dew">
    <div class="main">
      <div class="img loading"></div>
      <h1 class="heading loading"></h1>
      <p class="content loading"></p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.dew{
  background: #8360c3;
  background: -webkit-linear-gradient(to left, #2ebf91, #8360c3);
  background: linear-gradient(to left, #2ebf91, #8360c3);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 200vh;
}
.main {
  background: white;
  width: 400px;
  min-height: 400px;
  border-radius: 10px;
  -webkit-box-shadow: 10px 10px 0px -1px rgba(0,0,0,0.32);
  -moz-box-shadow: 10px 10px 0px -1px rgba(0,0,0,0.32);
  box-shadow: 10px 10px 0px -1px rgba(0,0,0,0.32);
  padding: 30px;
}

.loading {
  @apply my-4;
  background: #c1c1c1;
  min-height: 30px;
  position: relative;
  overflow: hidden;
}

.loading::before {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, transparent, #d7d7d7, transparent);
  transform: translateX(-100%);
  animation: loading 1s infinite;
}

@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}

.img {
  min-height: 200px;
}
</style>