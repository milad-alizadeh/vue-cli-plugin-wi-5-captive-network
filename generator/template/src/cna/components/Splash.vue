<template>
  <div class="p-splash">
    <VButton id="link-1" href="/?ids=fsdf" @click="handleClick" target="_self">Open Web App</VButton>
    <VText>Internet Access: {{ hasInternet }}</VText>
    <VLoader v-if="loading"/>
  </div>
</template>

<script>
import platform from 'platform'
import bootstrapper from '../../bootstrapper'
import { isCna } from '@/helpers'

import VLoader from 'atoms/VLoader'
import VButton from 'atoms/VButton'
import VHeading from 'atoms/VHeading'
import VText from 'atoms/VText'

export default {
  components: {
    VLoader,
    VHeading,
    VButton,
    VText
  },
  data () {
    return {
      loading: false,
      hasInternet: this.$route.query.hasinternet,
      clickeditemid: this.$route.query.clickeditemid,
      hasBeenTriggered: false,
      requiresRefresh: true,
      platform: platform.os.family,
      isCna
    }
  },
  mounted () {
    // Redirect to fallback page if a click has been triggered
    // and the new page is opened in captive portal
    if (this.hasBeenTriggered && isCna()) {
      this.gotToPage('/fallback')
    } else {
      this.triggerClick()
    }
  },
  methods: {
    gotToPage (path) {
      this.$router.push({ path, query: { ...this.$route.query } })
    },
    triggerClick (target, delay = 500) {
      if ((target || this.clickeditemid) && this.hasInternet) {
        setTimeout(() => {
          if (target) {
            target.click()
          } else if (this.clickeditemid) {
            // Trigger the link automatically if internet access is already granted
            document.getElementById(this.clickeditemid).click()
          }

          this.hasBeenTriggered = true

          // Redirect to CloseCna page if captive portal didn't close automatically
          setTimeout(() => {
            this.gotToPage('/close-cna')
          }, 2000)
        }, delay)
      }
    },
    async handleClick (e) {
      if (!this.hasInternet) {
        e.preventDefault()

        if (this.platform === 'Android' && isCna()) {
          this.gotToPage('/fallback')
          return
        }

        let { target } = e
        let id = e.target.getAttribute('id')

        this.loading = true
        bootstrapper.authenticate('cloudtrax')

        try {
          // Wait for internet connection
          await bootstrapper.waitForInternet()

          this.hasInternet = true
          this.clickeditemid = id
          this.loading = false

          // Update current route with new query parameters
          this.$router.push({
            path: this.$route.path,
            query: {
              ...this.$route.query,
              hasinternet: true,
              ...(id ? { clickeditemid: id } : {})
            }
          })

          // Check if we need to refresh the page
          if (this.requiresRefresh) {
            window.location.reload()
          } else {
            this.triggerClick(target, 2000)
          }
        } catch (e) {
          this.hasInternet = false
        }
      }
    }
  }
}
</script>

<style lang="scss">
.p-splash {
  padding: 2rem;

  .v-a-button,
  .v-a-text  {
    margin-bottom: 2rem;
  }
}
</style>
