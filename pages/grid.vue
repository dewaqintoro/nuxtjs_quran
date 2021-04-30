<template>
  <!-- <div class="h-auto md:h-screen bg-blue-200 p-10 sm:p-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 sm:grid-rows-5 md:grid-rows-4 gap-3 lg:gap-6 ">
    <div class="bg-indigo-500 text-white text-center text-5xl py-4 rounded-lg row-span-2 md:row-span-4 ">1</div>
    <div class="bg-green-400 text-white text-center text-5xl py-4 rounded-lg sm:col-span-2 md:col-span-3 ">2</div>
    <div class="bg-blue-500 text-white text-center text-5xl py-4 rounded-lg">3</div>
    <div class="bg-blue-500 text-white text-center text-5xl py-4 rounded-lg">4</div>
    <div class="bg-blue-500 text-white text-center text-5xl py-4 rounded-lg">5</div>
    <div class="bg-blue-500 text-white text-center text-5xl py-4 rounded-lg">6</div>
    <div class="bg-blue-500 text-white text-center text-5xl py-4 rounded-lg sm:col-span-2 md:col-span-1">7</div>
    <div class="bg-gray-500 text-white text-center text-5xl py-4 rounded-lg col-span-2 sm:col-span-3">8</div>

  </div> -->
  <div class="bg-gray-100">
    <div class="box">
      <input type="checkbox" class="toggle-btn" />
      <div class="signup"></div>
      <div class="login"></div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.toggle-btn {
  -webkit-appearance: none;
  width: 250px;
  height: 40px;
  border: 1px solid gray;
  position: absolute;
  top: 30px;
  left: calc(50% - 125px);
  border-radius: 100px;
}

.toggle-btn:before{
  @apply grid text-white font-bold place-items-center;
  content: 'Indonesia';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: green;
  border-radius: 100px;
  transition: 0.5s;
}

.toggle-btn:checked:before{
  content: 'Global';
  left: 50%;
}

</style>