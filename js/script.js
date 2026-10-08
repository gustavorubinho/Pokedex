const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');
const pokemonTypes = document.querySelector('.pokemon-types');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        const somDoPokemon = new Audio(data.cries.latest);
        somDoPokemon.volume = 0.1;
        somDoPokemon.play();
        input.value = '';

        pokemonTypes.innerHTML = '';
        data.types.forEach(item => {
    
    const urlParts = item.type.url.split('/');
    const typeId = urlParts[urlParts.length - 2]; 
    const typeImg = document.createElement('img');
    typeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/${typeId}.png`;
    typeImg.className = 'type-icon';
    pokemonTypes.appendChild(typeImg);
});
    } else {
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
        pokemonTypes.innerHTML = '';
    }
}

renderPokemon('7');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', () => {
    searchPokemon -= 1;
    if (searchPokemon < 1) {
        searchPokemon = 1;
    }
    renderPokemon(searchPokemon);
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);