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
p{color: black;}
.main {
  
  display: flex;
  justify-content: center;
  align-self: center;
  min-height: 100vh;
  background-color: #f0f0f0;
  
}
.container {
  position: relative;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  grid-template-rows: repeat(minmax(100px, auto));
  margin: 40px;
  grid-auto-flow: dense;
  grid-gap: 20px;
}

.container .box {
  @apply rounded-2xl;
  padding: 20px;
  display: grid;
  font-size: 20px;
  place-items: center;
  text-align: center;
  color: #fff;
  transition: 0.5s;

  background: #f0f0f0;
box-shadow:  5px 5px 12px #e4e4e4,
             -5px -5px 12px #fcfcfc;
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
    grid-column: span 2;
    grid-row: span 1;
  }
  .container .box:nth-child(2){
    grid-column: span 1;
    grid-row: span 1;
    
  }
  .container .box:nth-child(3){
    grid-column: span 1;
    grid-row: span 2;
    
  }
  .container .box:nth-child(4){
    grid-column: span 1;
    grid-row: span 2;
  }
  .container .box:nth-child(5){
  }
  
/* } */
</style>