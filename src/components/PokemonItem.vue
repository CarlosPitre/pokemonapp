<template>
  <div class="item-container">
    <div class="item-name">
      <span >{{ name }}</span>
    </div>
    <div class="item-icon">
      <font-awesome-icon icon="star" size="lg" :color="iconFavorite" />
    </div>
  </div>
</template>

<script lang='ts'>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { defineComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faStar);

export default defineComponent({
  name: 'PokemonItem',
  components: {
    FontAwesomeIcon,
  },
  props: {
    name: String,
    favorite: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    iconFavorite(): string {
      return this.favorite ? '#ECA539' : '#BFBFBF';
    },
  },
});
</script>

<style scoped>
  .item-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    margin: 5px 5px;
    border-radius: 5px;
    padding-left: 20px;
    padding-right: 10px;
  }
  .item-name {
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    text-transform: capitalize;
    padding: 17px 0;
  }
  .item-icon {
    height: 44px;
    width: 44px;
    background-color: #F5F5F5;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
