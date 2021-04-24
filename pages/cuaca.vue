<template>
  <div class="main">
    <div class="content">asu</div>
    <div class="box">
      <div class="square" style="--i:0"></div>
      <div class="square" style="--i:1"></div>
      <div class="square" style="--i:2"></div>
      <div class="square" style="--i:3"></div>
      <div class="square" style="--i:4"></div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.main {
  @apply min-h-screen bg-gray-100 items-center flex justify-center;
}

.content {
  @apply bg-gray-300 text-center;
  z-index: 10;
}

.box{
  position: relative;
}
.box .square {
  position: absolute;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  animation: animate 10s linear infinite;
  animation-delay: calc(-1s * var(--i));
}
@keyframes animate {
  0%, 100%{
    transform: translateY(-40px);
  }
  50%{
    transform: translateY(40px);
  }
}
.box .square:nth-child(1){
  top: -50px;
  right: 20vw;
  width: 100px;
  height: 100px;
  z-index: 2;
}
.box .square:nth-child(2){
  top: 150px;
  left: -100px;
  width: 120px;
  height: 120px;
  z-index: 2;
}
.box .square:nth-child(3){
  bottom: 50px;
  right: -60px;
  width: 80px;
  height: 80px;
  z-index: 2;
}
.box .square:nth-child(4){
  bottom: -80px;
  left: 100px;
  width: 50px;
  height: 50px;
}
.box .square:nth-child(5){
  top: -80px;
  left: 40px;
  width: 60px;
  height: 60px;
}
</style>