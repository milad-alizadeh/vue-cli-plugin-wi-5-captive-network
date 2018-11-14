<template>
  <div class="v-t-splash">
    <VButton
      id="link-1"
      href="/"
      target="_self"
      @click="$emit('externalLinkClicked', $event)"
    >Open Web App</VButton>
    <VLoader v-if="loading" />
  </div>
</template>

<script>
import VLoader from 'atoms/VLoader'
import VButton from 'atoms/VButton'

export default {
  name: 'VSplashTemplate',
  components: {
    VLoader,
    VButton
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.v-t-splash {
  padding: 2rem;

  .v-a-button,
  .v-a-text  {
    margin-bottom: 2rem;
  }
}
</style>
