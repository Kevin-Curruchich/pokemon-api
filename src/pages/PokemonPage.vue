<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>Quien es este pokemon?</h1>
    <pokemon-picture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <pokemon-options :pokemons="pokemonArr" @selection="checkAnswer" />
    <template v-if="showAnswer">
      <h2>{{ message }}</h2>
      <button @click="newGame">Nuevo juego</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";

import getPokemonsOptions from "@/helpers/pokemonOptions";

export default {
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonsOptions();
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(selectedId) {
      this.showPokemon = true;
      this.showAnswer = true;
      if (selectedId === this.pokemon.id) {
        this.message = `Correcto era ${this.pokemon.name}`;
      } else {
        this.message = `Oops era ${this.pokemon.name}`;
      }
    },
    newGame() {
      this.pokemonArr = [];
      this.pokemon = null;
      this.showPokemon = false;
      this.showAnswer = false;
      this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>
