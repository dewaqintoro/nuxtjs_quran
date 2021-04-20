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
  /* background-color: rgba(74, 222, 222, 0.1); */
  /* background: url('/andro4.svg'); */


  /* neo v1 */
  /* background-color: #E8E8E8; */

  /* neo v2 */
  /* background-color: #666666; */

background-color: #36454f;
  
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
  padding: 10px;
  display: grid;
  font-size: 20px;
  place-items: center;
  text-align: center;
  color: #fff;
  transition: 0.5s;
  /* max-width: 45vw; */

/* neo v2 */
  /* box-shadow:  5px 5px 10px #4e4e4e,
             -5px -5px 10px #7e7e7e; */

  box-shadow:  5px 5px 10px #29343c,
             -5px -5px 10px #435662;
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
    /* background-color: #7BD5F5; */
    /* background: url('/a1.svg');
    background-size: cover;
    background-repeat: no-repeat; */

    /* new v1 */
    /* background: #e0e0e0;
    box-shadow:  5px 5px 10px #9d9d9d,
                -5px -5px 10px #ffffff; */
    
    /* neo v2 */
    /* background: #36454f;
    box-shadow:  5px 5px 10px #444f4f,
             -5px -5px 10px #98afb1; */

    background: #36454f;
  }
  .container .box:nth-child(2){
    grid-column: span 1;
    grid-row: span 1;
    /* background-color: #787FF6; */
    /* background-color: #56C595; */
    /* background: url('/a2.svg');
    background-size: cover;
    background-repeat: no-repeat; */

    /* new v1 */
    /* background: #e0e0e0;
    box-shadow:  5px 5px 10px #9d9d9d,
                -5px -5px 10px #ffffff; */

    /* neo v2 */
    background: #495e68;
    
  }
  .container .box:nth-child(3){
    grid-column: span 1;
    grid-row: span 2;
    /* background-color: #4ADEDE; */
    /* background: url('/a3.svg');
    background-size: cover;
    background-repeat: no-repeat; */

    /* neo v1 */
    /* background: #e0e0e0;
    box-shadow:  5px 5px 10px #9d9d9d,
                -5px -5px 10px #ffffff; */

    /* neo v2 */
    background: #4b5661;

    
  }
  .container .box:nth-child(4){
    grid-column: span 1;
    grid-row: span 2;
    /* background-color: #7BD5F5; */
    /* background: url('/a4.svg');
    background-size: cover;
    background-repeat: no-repeat; */
    
    /* neo v1 */
    /* background: #e0e0e0; */

    background: #3d4d5a;
  }
  .container .box:nth-child(5){
    /* background-color: #7BE494; */
    /* background: url('/a5.svg'); */
    /* background-size: cover;
    background-repeat: no-repeat; */

    /* neo v1 */
    /* background: #e0e0e0; */

    /* neo v2 */
    background: #4d5b5c;

  }
  
/* } */
</style>