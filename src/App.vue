<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">{{pageTitle[$route.name]}}</span>
        <div class="mdl-layout-spacer"></div>
        <div
          class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right"
        >
          <label class="mdl-button mdl-js-button mdl-button--icon" for="fixed-header-drawer-exp">
            <i class="material-icons">search</i>
          </label>
          <div class="mdl-textfield__expandable-holder">
            <input
              class="mdl-textfield__input"
              type="text"
              name="sample"
              id="fixed-header-drawer-exp"
            >
          </div>
        </div>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Weibo Sentiment</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" @click="handleSwitchMenu('/')">热门微博</a>
        <a class="mdl-navigation__link" @click="handleSwitchMenu('/archives')">历史归档</a>
        <a class="mdl-navigation__link" @click="handleSwitchMenu('/settings')">设置</a>
        <a class="mdl-navigation__link" @click="handleSwitchMenu('/about')">关于</a>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <!-- Your content goes here -->
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: {
        hot: '热门微博',
        archives: '历史归档',
        settings: '设置',
        about: '关于'
      }
    }
  },
  methods: {
    handleSwitchMenu(route) {
      this.$router.push(route)
      const layout = document.getElementsByClassName(
        'mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header has-drawer is-upgraded'
      )[0]
      const layoutClasses = layout.getAttribute('class')
      if (layoutClasses.indexOf('is-small-screen') !== -1) {
        // 小屏幕模式切换后关闭 drawer
        const obfuscator = document.getElementsByClassName(
          'mdl-layout__obfuscator'
        )[0]
        obfuscator.setAttribute('class', 'mdl-layout__obfuscator')
        const drawer = document.getElementsByClassName('mdl-layout__drawer')[0]
        drawer.setAttribute('class', 'mdl-layout__drawer')
        drawer.setAttribute('aria-hidden', 'true')
        const drawerButton = document.getElementsByClassName(
          'mdl-layout__drawer-button'
        )[0]
        drawerButton.setAttribute('aria-expanded', 'false')
      }
    }
  }
}
</script>

<style>
.mdl-layout {
  min-height: 100vh;
}
a.mdl-navigation__link {
  cursor: pointer;
}
.page-content {
  /* padding: 40px; */
  padding: 16px;
}
/* @media (max-width: 1024px) {
  .page-content {
    padding: 16px;
  }
} */
</style>
