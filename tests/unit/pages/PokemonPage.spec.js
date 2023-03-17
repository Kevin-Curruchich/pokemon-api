import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "../../../src/pages/PokemonPage.vue";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonPage Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  test("debe de hacer match con el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de llamar mixPokemonArray al mount", () => {
    const mixPokemonArraySpy = jest.spyOn(
      PokemonPage.methods,
      "mixPokemonArray"
    );

    shallowMount(PokemonPage);

    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  test("debe de hacer match con el snapshot cuando carga los pokemons", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de mostrar los componentes de PokemonPicture y PokemonOptions", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });

    const picture = wrapper.find("pokemon-picture-stub");
    const options = wrapper.find("pokemon-options-stub");

    expect(picture.exists()).toBeTruthy();
    expect(options.exists()).toBeTruthy();

    expect(picture.attributes("pokemonid")).toBe("1");
    expect(options.attributes("pokemons")).toBeTruthy();
  });

  test("prueba con el checkAnswer", async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });

    await wrapper.vm.checkAnswer(1);

    expect(wrapper.find("h2").exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBeTruthy();
  });
});
