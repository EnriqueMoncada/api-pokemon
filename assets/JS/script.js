const API = 'https://pokeapi.co/api/v2/pokemon'

const pokeCard = document.querySelector('[pokemonData]')
const pokeName = document.querySelector('[pokemonDataName]')
const pokeBoxImg = document.querySelector('[pokemonBoxImg]')
const pokeImg = document.querySelector('[pokemonImg]')
const pokeId = document.querySelector('[pokemonDataId]')
const pokeTypes = document.querySelector('[PokemonDataTypes]')
const pokeStats = document.querySelector('[pokemonDataStats]')

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi)
    const data = await response.json()
        .then(data => renderPokemonData(data))
        .catch(err => renderNotFound())
    return data
}

function findPokemon(e) {
    const { value } = e.target.pokemonWanted;
    fetchData(`${API}/${value.toLowerCase()}`);
    e.preventDefault();
}

function renderPokemonData(data) {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeId.textContent = `Nº ${data.id}`;
    pokeImg.setAttribute('src', sprite);

    setCardColor(types)
    renderPokemonTypes(types)
    renderPokemonStats(stats)
}

function setCardColor (types){
    const colorOne = typeColors[types[0].type.name]
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;

    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}
 

function renderPokemonTypes (types) {
    pokeTypes.innerHTML = '';

    types.forEach(type => {
        const typeTextElement = document.createElement("div")
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement)
    });
}

function renderPokemonStats (stats) {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {

        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementMount = document.createElement("div");

        statElementName.textContent = stat.stat.name;
        statElementMount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementMount)
        pokeStats.appendChild(statElement);
    });
}

function renderNotFound () {
    pokeName.textContent = 'Pokemon no encontrado';
    pokeImg.setAttribute('src', '/assets/IMG/error.png');
    pokeImg.style.background = '#fff'
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}