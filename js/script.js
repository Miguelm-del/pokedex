const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImg = document.getElementById("pokemon");
const pokedexInput = document.querySelector(".input_search");

const form = document.querySelector(".form");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  } else {
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImg.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_shiny"
      ];
    searchPokemon = data.id;
    pokedexInput.value = "";
  } else {
    pokemonName.innerHTML = "Não encontrado";
    pokemonNumber.innerHTML = "";
    pokemonImg.style.display = "none";
  }
};

renderPokemon(searchPokemon);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(pokedexInput.value.toLowerCase());
});


buttonPrev.onclick = () => {
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
  };
  

buttonNext.onclick = () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
};
