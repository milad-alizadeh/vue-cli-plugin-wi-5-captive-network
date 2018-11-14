<template>
  <div class="v-p-splash">
    <VSplashTemplate
      :isLoading="isLoading"
      @externalLinkClicked="handleClick"
    />
  </div>
</template>

<script>
import VSplashTemplate from 'templates/VSplashTemplate'

import platform from 'platform'
import bootstrapper from '../../bootstrapper'
import isCna from '@/helpers/is-cna'

export default {
  name: 'VSplashPage',
  components: {
    VSplashTemplate
  },
  data () {
    return {
      isLoading: false,
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
      this.gotToPage('/cna/fallback')
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
            this.gotToPage('/cna/close-cna')
          }, 2000)
        }, delay)
      }
    },
    async handleClick (e) {
      if (!this.hasInternet) {
        e.preventDefault()

        if (window.navigator.userAgent.indexOf('Android') > -1 && isCna()) {
          this.gotToPage('/cna/fallback')
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
