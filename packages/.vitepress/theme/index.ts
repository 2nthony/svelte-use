import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'
import DemoContainer from './components/DemoContainer.vue'

import './styles/vars.css'
import './styles/layout.css'
import './styles/code.css'
import './styles/demo.css'
import './styles/custom-blocks.css'
import './styles/sidebar-links.css'
import './styles/utils.css'
import 'windi.css'

const theme = {
  //...DefaultTheme,
  Layout,
  NotFound,
  enhanceApp({ app }) {
    app.component('DemoContainer', DemoContainer)
  },
}

export default theme
