<template>
<div class="main">
  <div class="container">
    <nuxt-link to="/surah" class="box">
      <div class="content items-center">
        <img class="m-auto" src="/cooking.png"/>
        <p>Daftar Surat</p>
      </div>
    </nuxt-link>
    <nuxt-link to="/surah" class="box">
      <div class="content items-center">
        <img class="m-auto" src="/cooking.png"/>
        <p>Daftar Surat</p>
      </div>
    </nuxt-link>
    <nuxt-link to="/surah" class="box">
      <div class="content items-center">
        <img class="m-auto" src="/cooking.png"/>
        <p>Daftar Surat</p>
      </div>
    </nuxt-link>
    <nuxt-link to="/surah" class="box">
      <div class="content items-center">
        <img class="m-auto" src="/cooking.png"/>
        <p>Daftar Surat</p>
      </div>
    </nuxt-link>
    <nuxt-link to="/surah" class="box">
      <div class="content items-center">
        <img class="m-auto" src="/cooking.png"/>
        <p>Daftar Surat</p>
      </div>
    </nuxt-link>
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
  background-color: #f7f7f7;
  
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

  background: #f7f7f7;
box-shadow:  5px 5px 12px #dedede,
             -5px -5px 12px #ffffff;
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