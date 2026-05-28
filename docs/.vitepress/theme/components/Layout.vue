&lt;script setup&gt;
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useData, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout: VPLayout } = DefaultTheme
const { localeIndex } = useData()

const isZhCN = computed(() =&gt; localeIndex.value === 'root')
const isZhTW = computed(() =&gt; localeIndex.value === 'zh-TW')
const isEnglish = computed(() =&gt; localeIndex.value === 'en')

const showLangMenu = ref(false)

const shopUrl = computed(() =&gt; {
  if (isZhCN.value) {
    return 'https://juxitechnology.taobao.com/'
  }
  return 'https://www.juxitech.com/'
})

const shopText = computed(() =&gt; {
  if (isEnglish.value) {
    return 'Shop'
  }
  return '商店'
})

const currentLangText = computed(() =&gt; {
  if (isEnglish.value) {
    return 'EN'
  }
  if (isZhTW.value) {
    return '繁體'
  }
  return '简体'
})

function switchLang(locale) {
  const newPath = locale === 'root' ? '/' : `/${locale}/`
  window.location.href = withBase(newPath)
  showLangMenu.value = false
}

function handleClickOutside(event) {
  const target = event.target
  if (!target.closest('.lang-selector-wrapper')) {
    showLangMenu.value = false
  }
}

onMounted(() =&gt; {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() =&gt; {
  document.removeEventListener('click', handleClickOutside)
})
&lt;/script&gt;

&lt;template&gt;
  &lt;VPLayout&gt;
    &lt;template #nav-bar-content-after&gt;
      &lt;div class="custom-nav-extra"&gt;
        &lt;div class="lang-selector-wrapper"&gt;
          &lt;button class="lang-button" @click.stop="showLangMenu = !showLangMenu"&gt;
            {{ currentLangText }}
            &lt;span class="arrow"&gt;▼&lt;/span&gt;
          &lt;/button&gt;
          &lt;div v-if="showLangMenu" class="lang-dropdown"&gt;
            &lt;a class="lang-option" @click.prevent="switchLang('root')"&gt;简体中文&lt;/a&gt;
            &lt;a class="lang-option" @click.prevent="switchLang('en')"&gt;English&lt;/a&gt;
            &lt;a class="lang-option" @click.prevent="switchLang('zh-TW')"&gt;繁體中文&lt;/a&gt;
          &lt;/div&gt;
        &lt;/div&gt;

        &lt;a :href="shopUrl" target="_blank" class="shop-link"&gt;{{ shopText }}&lt;/a&gt;

        &lt;a href="https://github.com/Juxi-Technology" target="_blank" class="nav-icon" title="GitHub"&gt;
          &lt;svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"&gt;
            &lt;path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.576 9.576 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.939.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/&gt;
          &lt;/svg&gt;
        &lt;/a&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/VPLayout&gt;
&lt;/template&gt;

&lt;style scoped&gt;
.custom-nav-extra {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lang-selector-wrapper {
  position: relative;
}

.lang-button {
  background: none;
  border: none;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s;
}

.lang-button:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.arrow {
  font-size: 10px;
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  min-width: 140px;
  z-index: 1000;
}

.lang-option {
  display: block;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: none;
  color: var(--vp-c-text-1);
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.lang-option:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.shop-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.2s;
}

.shop-link:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: var(--vp-c-text-1);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-icon:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}
&lt;/style&gt;
