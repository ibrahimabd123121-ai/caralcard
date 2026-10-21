<script setup>
import { translate } from '../i18n'

defineProps({
  locale: {
    type: String,
    default: 'en',
  },
  activeCategory: {
    type: String,
    default: 'All',
  },
})

const emit = defineEmits(['select'])

const categories = [
  { name: 'All', icon: 'bi-grid-fill' },
  { name: 'Steam', icon: 'bi-steam' },
  { name: 'PlayStation', icon: 'bi-controller' },
  { name: 'AI', icon: 'bi-xbox' },
  { name: 'bigo', icon: 'bi-nintendo-switch' },
  { name: 'PC Gaming', icon: 'bi-pc-display' },
  { name: 'Subscriptions', icon: 'bi-stars' },
]
</script>

<template>
  <section id="categories" class="categories-section">
    <div class="section-heading">
      <div>
        <span class="section-kicker">{{ translate(locale, 'categories.kicker') }}</span>
        <h2>{{ translate(locale, 'categories.browse') }} <span>{{ translate(locale, 'nav.categories') }}</span></h2>
      </div>

      <span class="section-note">{{ translate(locale, 'categories.choose') }}</span>
    </div>

    <div class="category-list">
      <button
        v-for="category in categories"
        :key="category.name"
        type="button"
        class="category-chip"
        :class="{ selected: activeCategory === category.name }"
        @click="emit('select', category.name)"
      >
        <i :class="`bi ${category.icon}`"></i>
        <span>{{ translate(locale, `category.${category.name}`) }}</span>
      </button>
    </div>
  </section>
</template>