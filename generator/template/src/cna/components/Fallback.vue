<template>
  <div class="p-fallback">
    <VHeading :level="3">Please choose one of the following options to get a link to our app</VHeading>
    <VList>
      <li>SMS</li>
      <li>WhatsApp</li>
      <li>Email</li>
    </VList>
  </div>
</template>

<script>
import VHeading from 'atoms/VHeading'
import VList from 'atoms/VList'

export default {
  components: {
    VHeading,
    VList
  }
}
</script>

<style lang="scss">
.p-fallback {
  padding: 2rem;

  .v-a-heading {
    color: $blue;
  }
}
</style>
