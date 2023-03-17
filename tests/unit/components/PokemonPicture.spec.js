import { shallowMount } from "@vue/test-utils";
import PokemonPicture from "@/components/PokemonPicture";

describe("PokemonPicture component", () => {
  test("Debe de hacer match con el snapshot", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 1,
        showPokemon: false,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de mostrar la imagen oculta y el pokemon 100", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: false,
      },
    });

    const [img1, img2] = wrapper.findAll("img");
    expect(img1.exists()).toBeTruthy();
    expect(img2).toBe(undefined);
    expect(img1.classes("hidden-pokemon")).toBeTruthy();

    expect(img1.attributes("src")).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg"
    );
  });
  test("debe de mostrar el pokemon si showPOkemon:true", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: true,
      },
    });

    const img = wrapper.find("img");
    expect(img.exists()).toBeTruthy();
    expect(img.classes("fade-in")).toBe(true);
  });
});
