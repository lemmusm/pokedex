
// VARIABLES
const pokemonUI = document.querySelector('#pokemonInfo');
const formularioUI = document.querySelector('#formulario');
const pokeIdUI = document.querySelector('#pokemonId');

const API_URL = 'https://pokeapi.co/api/v2/';

// CLASES
class API {
    async getPokemonById(id) {
        const search = id || this.id
        const response = await fetch(`${API_URL}pokemon/${search}`)
        const pokemon = await response.json()
        this.pokemon = pokemon
        return pokemon
    }
}

class Pokemon extends API {

    constructor(id) {
        super(id)
        this.id = id
    }

    renderCard = () => {
        pokemonUI.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.id}.png" class="align-self-center mr-3" alt="${this.pokemon.name}">
        <div class="media-body">
            <h5 class="mt-0">${this.pokemon.name}</h5>
            <p>${this.pokemon.id}</p>
            <p>${this.pokemon.types[0].type.name}</p>
        </div>
        `
    }
}

formularioUI.addEventListener('submit', (e) => {
    //  Evita refresh en el evento submit
    e.preventDefault()
    // Obetener valor del input
    let idUI = pokeIdUI.value
    const pokemon = new Pokemon()
    pokemon.getPokemonById(idUI)
        .then(
            (data) => {
                pokemon.renderCard()
            }
        )
        .catch((e) => {
            pokemonUI.innerHTML = `
                <div class="media-body">
                    <h5 class="mt-0">ID Not found!</h5>
                    <p>Try other</p>
                </div>
                `
        })

    formularioUI.reset()

})

