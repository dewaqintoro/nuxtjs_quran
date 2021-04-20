<template>
<div class="main">
  <div class="container">
    <div class="box">
      <div class="content">
        <img src="/cooking.png"/>
        <p>Lorem ipsum</p>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <img src="/cooking.png"/>
        <p>Lorem ipsum</p>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <img src="/cooking.png"/>
        <p>Lorem ipsum</p>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <img src="/cooking.png"/>
        <p>Lorem ipsum</p>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <img src="/cooking.png"/>
        <p>Lorem ipsum</p>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="postcss" scoped>
.main {
  display: flex;
  justify-content: center;
  align-self: center;
  min-height: 100vh;
  background: #222;
}
.container {
  position: relative;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  grid-template-rows: repeat(minmax(100px, auto));
  margin: 40px;
  grid-auto-flow: dense;
  grid-gap: 10px;
}

.container .box {
  background: #333;
  padding: 10px;
  display: grid;
  font-size: 20px;
  place-items: center;
  text-align: center;
  color: #fff;
  transition: 0.5s;
  /* max-width: 45vw; */
}

.container .box:hover {
  background: #e91e63;
}

.container .box img {
  position: relative;
  max-width: 50px;
  margin-bottom: 10px;
}


@screen mobile {
  .container .box:nth-child(1){
    grid-column: span 1;
    grid-row: span 1;
  }
  .container .box:nth-child(2){
    grid-column: span 1;
    grid-row: span 2;
  }
  .container .box:nth-child(3){
    grid-column: span 1;
    grid-row: span 2;
  }
  .container .box:nth-child(5){
    grid-column: span 2;
    grid-row: span 1;
  }
}
</style>