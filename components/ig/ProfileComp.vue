<template>
  <div class="main px-4">
    <div class="header mt-2">
      <div class="header-name">
        <p class="text-2xl font-bold">dewaqintoro</p>
        <span class="flex justify-center mt-3 ml-2">
          <font-awesome-icon :icon="['fas', 'chevron-down']" />
        </span>
      </div>
      <div>
        <font-awesome-icon class="header-icon mr-2" :icon="['fas', 'plus-square']" />
        <font-awesome-icon class="header-icon" :icon="['fas', 'bars']" />
      </div>
    </div>
    <div class="account">
      <div>
        <img src="https://res.cloudinary.com/dewaqintoro/image/upload/v1625883355/Ngodingbentar/Music/200x200cc_2_vwvpll.jpg" />
      </div>
      <div class="left">
        <div class="item">
          <p class="text-xl">1</p>
          <p>Posts</p>
        </div>
        <div class="item">
          <p class="text-xl">768</p>
          <p>Followers</p>
        </div>
        <div class="item">
          <p class="text-xl">756</p>
          <p>Followings</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.header{
  @apply flex justify-between ;
}
.header-name{
  @apply flex justify-center my-auto;
}
.header-icon{
  font-size: 30px;
}
.account{
  @apply flex justify-between mt-4;
}
.account .left{
  width: 65%;
  /* background: gray; */
  @apply flex justify-between my-auto;
}
.account img{
  width: 100px;
  @apply rounded-full;
}
.account .item{
  @apply text-center font-bold;
}
</style>