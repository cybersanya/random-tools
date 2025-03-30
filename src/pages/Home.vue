<template>
  <div class="home-page">
    <h1>Каталог рандомных утилит</h1>
    <p>
      Переодически сталкиваясь с разными проблемами по жизни, у меня возникало
      острое желание атоматизировать их решение. Этот сайт - каталог таких
      автоматизаций.
    </p>
  </div>
  <div class="catalog">
    <FeatureCard
      title="Сортировщик"
      description="Постройте рейтинг своих любимых фильмов, спортивных команд или еще
          чего-нибудь, сравнивая их попарно."
      button="Перейти"
      icon="pi pi-sort"
      route="/sorter"
    />
  </div>
</template>

<script setup lang="ts">
import FeatureCard from '../components/FeatureCard.vue'
</script>

<style scoped>
.card-content {
  margin: 0 0 8px;
}

h1 {
  margin-top: 0;
}

.catalog {
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media screen and (max-width: 700px) {
  .catalog {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
