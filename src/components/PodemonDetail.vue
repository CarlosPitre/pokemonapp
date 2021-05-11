<template>
  <div class="header">
    <div class="icon-close">
      <button class="button-icon" @click="onClose">
        <font-awesome-icon icon="times-circle" size="lg" color="white" />
      </button>
    </div>
    <div class="image-pokemon">
      <img :src="imagePokemon" >
    </div>
  </div>
  <div class="body">
    <div class="item">
      <span><strong>Name</strong>: {{ pokemon.name }}</span>
    </div>
    <div class="item">
      <span><strong>Weight</strong>: {{ pokemon.weight }}</span>
    </div>
    <div class="item">
      <span><strong>Heigth</strong>: {{ pokemon.height }}</span>
    </div>
    <div class="item">
      <span>
        <strong>Types</strong>:
        <span v-for="typePokemon in pokemon.types" :key="typePokemon.name">
          {{typePokemon.type.name}},
        </span>
      </span>
    </div>
    <div class="actions">
      <button-primay text="Share to my friends" @onPress="sharePokemon" />
      <button class="icon-container" @click="onPressFavorite">
        <font-awesome-icon icon="star" size="lg" :color="iconFavorite" />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Pokemon from '@/types/Pokemon';
import { defineComponent, PropType } from 'vue';
import ButtonPrimay from '@/components/ButtonPrimary.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapActions, mapState } from 'vuex';
import { MyPokemonList } from '@/types/GetPokemons';

library.add(faStar, faTimesCircle);

interface DataPokemonDetail {
  favorite: boolean,
}

export default defineComponent({
  name: 'PodemonDetail',
  components: { ButtonPrimay, FontAwesomeIcon },
  emits: ['onClose', 'addFavorite'],
  data(): DataPokemonDetail {
    return {
      favorite: false,
    };
  },
  props: {
    pokemon: {
      type: Object as PropType<Pokemon>,
      default: {} as Pokemon,
    },
  },
  methods: {
    ...mapActions(['addFavoriteAction', 'removeFavoriteAction']),
    onPressFavorite() {
      const existFavorite = this.myPokemons.map((myPokemon: MyPokemonList) => myPokemon.name)
        .includes(this.pokemon.name);
      if (!existFavorite) {
        this.addFavoriteAction(this.pokemon);
      } else {
        this.removeFavoriteAction(this.pokemon.name);
      }
    },
    onClose() {
      this.$emit('onClose');
    },
    sharePokemon() {
      navigator.clipboard.writeText(`Pokemon: ${this.pokemon.name}, weight: ${this.pokemon.weight}, height: ${this.pokemon.height}`);
    },
  },
  computed: {
    ...mapState(['myPokemons']),
    iconFavorite(): string {
      return this.myPokemons.map((myPokemon: MyPokemonList) => myPokemon.name).includes(this.pokemon.name) ? '#ECA539' : '#BFBFBF';
    },
    imagePokemon(): string {
      return `https://pokeres.bastionbot.org/images/pokemon/${this.pokemon.id}.png`;
    },
  },
});

</script>
<style lang="scss" scoped>
  .header {
    background-image: url('../assets/header-detail.svg');
    display: flex;
    flex-direction: column;

    .image-pokemon {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 180px;
        height: 180px;
      }
    }
    .icon-close {
      display: flex;
      justify-content: flex-end;
      padding: 10px 10px 0px 0px;

      .button-icon {
        font-size: 20px;
        background-color: transparent;
        border: none;
      }
    }
  }
  .body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .item {
      display: flex;
      flex-direction: row;
      padding: 10px 0px;
      border-bottom: solid 1px #E8E8E8;
      font-size: 18px;
      color: #5E5E5E;
    }

    .actions {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

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
  }
</style>
