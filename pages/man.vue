<template>
<div class="main">
  <div class="container">
    <div class="box">
      <div class="content">
        <img src="/cooking.png"/>
        <p>Daftar Surat</p>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <img src="/cooking.png"/>
        <p>Do'a Harian</p>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <img src="/cooking.png"/>
        <p>Do'a Tahlil</p>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <img src="/cooking.png"/>
        <p>Wirid</p>
      </div>
    </div>
    <div class="box">
      <div class="content">
        <img src="/cooking.png"/>
        <p>Asmaul Husna</p>
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
  /* background-color: #4ADEDE; */
  background-color: rgba(74, 222, 222, 0.1);
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
  @apply rounded-2xl;
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


/* @screen mobile { */
  .container {
    margin: 20px;
  }
  .container .box:nth-child(1){
    background-color: #7BD5F5;
    grid-column: span 2;
    grid-row: span 1;
  }
  .container .box:nth-child(2){
    /* background-color: #787FF6; */
    background-color: #56C595;
    grid-column: span 1;
    grid-row: span 1;
  }
  .container .box:nth-child(3){
    background-color: #4ADEDE;
    grid-column: span 1;
    grid-row: span 2;
  }
  .container .box:nth-child(4){
    background-color: #7BD5F5;
    grid-column: span 1;
    grid-row: span 2;
  }
  .container .box:nth-child(5){
    background-color: #7BE494;
  }
  
/* } */
</style>