<template>
  <div class="item-container">
    <div class="item-name">
      <span >{{ pokemon.name }}</span>
    </div>
    <div class="icon-container">
      <font-awesome-icon icon="star" size="lg" :color="iconFavorite" />
    </div>
  </div>
</template>

<script lang='ts'>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { defineComponent, PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { MyPokemonList } from '@/types/GetPokemons';
import { mapState } from 'vuex';

library.add(faStar);

export default defineComponent({
  name: 'PokemonItem',
  components: {
    FontAwesomeIcon,
  },
  props: {
    pokemon: {
      type: Object as PropType<MyPokemonList>,
    },
  },
  computed: {
    ...mapState(['myPokemons']),
    iconFavorite(): string {
      return this.pokemon?.favorite ? '#ECA539' : '#BFBFBF';
    },
  },
});
</script>

<style scoped lang="scss">
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

    .item-name {
      font-weight: 500;
      font-size: 22px;
      line-height: 26px;
      text-transform: capitalize;
      padding: 17px 0;
    }
    .icon-container {
      height: 44px;
      width: 44px;
      background-color: #F5F5F5;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      font-size: 20px;
    }
  }
</style>
