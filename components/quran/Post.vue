<template>
  <article>
    <h3>{{ post.arabic }}</h3>
    <p>{{post.latin}}</p>
  </article>
</template>
<script>
export default {
  props: ["post"]
};
</script>

