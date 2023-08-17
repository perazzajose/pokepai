const pokeapi_URL = "https://pokeapi.co/api/v2/";
const ability_URL = 'https://pokeapi.co/api/v2/ability/';
const pokemon_URL = "https://pokeapi.co/api/v2/pokemon/";
const region_URL = "https://pokeapi.co/api/v2/region/";

const pokemonData = [
  { name: 'Ditto', url: 'https://pokeapi.co/api/v2/pokemon/ditto', regionUrl: 'https://pokeapi.co/api/v2/region/1/' },
  { name: 'Riolu', url: 'https://pokeapi.co/api/v2/pokemon/riolu', regionUrl: 'https://pokeapi.co/api/v2/region/4/' },
  { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu', regionUrl: 'https://pokeapi.co/api/v2/region/1/' },
];

const cards = document.querySelectorAll('.card');

pokemonData.forEach(pokemon => {
  const abilityList = document.createElement('ul');
  abilityList.classList.add(`ability-list-${pokemon.name.toLowerCase()}`);

  fetch(pokemon.url)
    .then(response => response.json())
    .then(data => {
      const abilities = data.abilities;

      abilities.forEach(abilityObj => {
        const abilityName = abilityObj.ability.name;

        const listItem = document.createElement('li');
        listItem.textContent = abilityName;
        abilityList.appendChild(listItem);
      });

      const cardBody = document.querySelector(`.ability-list-${pokemon.name.toLowerCase()}`);
      cardBody.appendChild(abilityList);
    })
    .catch(error => {
      console.error(`Error al cargar las habilidades de ${pokemon.name}:`, error);
    });

  fetch(pokemon.regionUrl)
    .then(response => response.json())
    .then(regionData => {
      const regionName = regionData.name;

      const regionListItem = document.createElement('p');
      regionListItem.textContent = `Region: ${regionName}`;

      const regionList = document.querySelector(`.region-list-${pokemon.name.toLowerCase()}`);
      regionList.appendChild(regionListItem);
    })
    .catch(error => {
      console.error(`Error al cargar la región de ${pokemon.name}:`, error);
    });
});

const botonBuscar = document.querySelector('.btn-secondary');
botonBuscar.addEventListener('click', () => {
  const opcionSeleccionada = document.querySelector('.form-select').value;

  pokemonData.forEach(pokemon => {
    const listaHabilidades = document.querySelector(`.ability-list-${pokemon.name.toLowerCase()}`);
    const listaRegion = document.querySelector(`.region-list-${pokemon.name.toLowerCase()}`);

    listaHabilidades.style.display = 'none'; // Ocultamos la lista de habilidades
    listaRegion.style.display = 'none'; // Ocultamos la información de la región

    if (opcionSeleccionada === '1') {
      listaHabilidades.innerHTML = ''; // Limpiamos la lista de habilidades
      listaRegion.innerHTML = ''; // Limpiamos la información de la región
    } else if (opcionSeleccionada === '2') {
      if (listaHabilidades.children.length === 0) {
        fetch(pokemon.url)
          .then(response => response.json())
          .then(data => {
            const abilities = data.abilities;

            abilities.forEach(abilityObj => {
              const abilityName = abilityObj.ability.name;

              const listItem = document.createElement('li');
              listItem.textContent = abilityName;
              listaHabilidades.appendChild(listItem);
            });

            listaHabilidades.style.display = 'block'; // Mostramos la lista de habilidades
          })
          .catch(error => {
            console.error(`Error al cargar las habilidades de ${pokemon.name}:`, error);
          });
      }
    } else if (opcionSeleccionada === '3') {
      if (listaRegion.children.length === 0) {
        fetch(pokemon.regionUrl)
          .then(response => response.json())
          .then(datosRegion => {
            const nombreRegion = datosRegion.name;

            const elementoListaRegion = document.createElement('p');
            elementoListaRegion.textContent = `Región: ${nombreRegion}`;

            listaRegion.appendChild(elementoListaRegion); // Agregamos la información de la región
            listaRegion.style.display = 'block'; // Mostramos la información de la región
          })
          .catch(error => {
            console.error(`Error al cargar la región de ${pokemon.name}:`, error);
          });
      }
    }
  });
});

