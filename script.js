(() => {
    const pokemonListDiv = document.getElementById('pokemon-list');
    const pokemonDetailsDiv = document.getElementById('pokemon-details');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    const initialLimit = 20; // Fetch in smaller chunks for better initial load
    const maxPokemonToDisplay = 100;
    let allPokemonData = [];
    let nextUrl = null;
    let isLoading = false;

    const displayLoadingList = (isLoading = true) => {
        pokemonListDiv.innerHTML = isLoading ? '<div class="loading">Loading Pokémon list...</div>' : '';
    };

    const displayLoadingDetails = (isLoading = true) => {
        pokemonDetailsDiv.innerHTML = isLoading ? '<div class="loading">Loading details...</div>' : '';
    };

    const displayError = (message, targetDiv) => {
        targetDiv.innerHTML = `<p class="error">Error: ${message}</p>`;
    };

    async function fetchPokemonList(url = `${apiUrl}?limit=${initialLimit}`) {
        if (isLoading || (allPokemonData.length >= maxPokemonToDisplay && nextUrl === null)) {
            return;
        }
        isLoading = true;
        displayLoadingList();

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (nextUrl === null) {
                allPokemonData = data.results;
            } else {
                allPokemonData = [...allPokemonData, ...data.results];
            }
            nextUrl = data.next;
            displayPokemonListInternal(allPokemonData.slice(0, maxPokemonToDisplay)); // Display up to the limit
        } catch (error) {
            console.error('Error fetching Pokémon list:', error);
            displayError('Failed to load Pokémon list.', pokemonListDiv);
            nextUrl = null; // Prevent further loading on error
        } finally {
            isLoading = false;
        }
    }

    function displayPokemonListInternal(pokemonList) {
        pokemonListDiv.innerHTML = '';
        pokemonList.forEach(pokemon => {
            const button = document.createElement('button');
            button.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            button.addEventListener('click', () => fetchPokemonDetails(pokemon.url));
            pokemonListDiv.appendChild(button);
        });

        if (nextUrl && allPokemonData.length < maxPokemonToDisplay) {
            const loadMoreButton = document.createElement('button');
            loadMoreButton.textContent = 'Load More';
            loadMoreButton.classList.add('load-more-button');
            loadMoreButton.addEventListener('click', () => fetchPokemonList(nextUrl));
            pokemonListDiv.appendChild(loadMoreButton);
        }
    }

    async function fetchPokemonDetails(url) {
        displayLoadingDetails();
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayPokemonDetails(data);
        } catch (error) {
            console.error('Error fetching Pokémon details:', error);
            displayError('Failed to load Pokémon details.', pokemonDetailsDiv);
        }
    }

    function displayPokemonDetails(pokemon) {
        pokemonDetailsDiv.innerHTML = `
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <div class="pokemon-image">
                <img src="${pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || pokemon.sprites.front_default}" alt="${pokemon.name}">
            </div>
            <div class="pokemon-stats">
                <p><strong>ID:</strong> ${pokemon.id}</p>
                <p><strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p><strong>Height:</strong> ${(pokemon.height / 10).toFixed(1)} m</p>
                <p><strong>Weight:</strong> ${(pokemon.weight / 10).toFixed(1)} kg</p>
                <h3>Base Stats:</h3>
                ${pokemon.stats.map(stat => `<p><strong>${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</strong> ${stat.base_stat}</p>`).join('')}
            </div>
        `;
    }

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPokemon = allPokemonData.filter(pokemon => pokemon.name.includes(searchTerm));
        displayPokemonListInternal(filteredPokemon);
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPokemon = allPokemonData.filter(pokemon => pokemon.name.includes(searchTerm));
        displayPokemonListInternal(filteredPokemon);
    });

    // Initial fetch
    fetchPokemonList();
})();
(() => {
    const pokemonListDiv = document.getElementById('pokemon-list');
    const pokemonDetailsDiv = document.getElementById('pokemon-details');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    const initialLimit = 20;
    const maxPokemonToDisplay = 100;
    let allPokemonData = [];
    let nextUrl = null;
    let isLoading = false;
    let easterEggTriggered = false; // Flag to track if the Easter egg is active

    const displayLoadingList = (isLoading = true) => {
        pokemonListDiv.innerHTML = isLoading ? '<div class="loading">Loading Pokémon list...</div>' : '';
    };

    const displayLoadingDetails = (isLoading = true) => {
        pokemonDetailsDiv.innerHTML = isLoading ? '<div class="loading">Loading details...</div>' : '';
    };

    const displayError = (message, targetDiv) => {
        targetDiv.innerHTML = `<p class="error">Error: ${message}</p>`;
    };

    async function fetchPokemonList(url = `${apiUrl}?limit=${initialLimit}`) {
        if (isLoading || (allPokemonData.length >= maxPokemonToDisplay && nextUrl === null)) {
            return;
        }
        isLoading = true;
        displayLoadingList();

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (nextUrl === null) {
                allPokemonData = data.results;
            } else {
                allPokemonData = [...allPokemonData, ...data.results];
            }
            nextUrl = data.next;
            displayPokemonListInternal(allPokemonData.slice(0, maxPokemonToDisplay));
        } catch (error) {
            console.error('Error fetching Pokémon list:', error);
            displayError('Failed to load Pokémon list.', pokemonListDiv);
            nextUrl = null;
        } finally {
            isLoading = false;
        }
    }

    function displayPokemonListInternal(pokemonList) {
        pokemonListDiv.innerHTML = '';
        pokemonList.forEach(pokemon => {
            const button = document.createElement('button');
            button.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            button.addEventListener('click', () => fetchPokemonDetails(pokemon.url));
            pokemonListDiv.appendChild(button);
        });

        if (nextUrl && allPokemonData.length < maxPokemonToDisplay) {
            const loadMoreButton = document.createElement('button');
            loadMoreButton.textContent = 'Load More';
            loadMoreButton.classList.add('load-more-button');
            loadMoreButton.addEventListener('click', () => fetchPokemonList(nextUrl));
            pokemonListDiv.appendChild(loadMoreButton);
        }

        // Easter Egg Trigger: Check if the user has searched for "mew" exactly
        if (!easterEggTriggered && searchInput.value.toLowerCase() === 'mew') {
            easterEggTriggered = true;
            displayEasterEgg();
        }
    }

    async function fetchPokemonDetails(url) {
        displayLoadingDetails();
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayPokemonDetails(data);
        } catch (error) {
            console.error('Error fetching Pokémon details:', error);
            displayError('Failed to load Pokémon details.', pokemonDetailsDiv);
        }
    }

    function displayPokemonDetails(pokemon) {
        pokemonDetailsDiv.innerHTML = `
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <div class="pokemon-image">
                <img src="${pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || pokemon.sprites.front_default}" alt="${pokemon.name}">
            </div>
            <div class="pokemon-stats">
                <p><strong>ID:</strong> ${pokemon.id}</p>
                <p><strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p><strong>Height:</strong> ${(pokemon.height / 10).toFixed(1)} m</p>
                <p><strong>Weight:</strong> ${(pokemon.weight / 10).toFixed(1)} kg</p>
                <h3>Base Stats:</h3>
                ${pokemon.stats.map(stat => `<p><strong>${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</strong> ${stat.base_stat}</p>`).join('')}
            </div>
        `;
    }

    function displayEasterEgg() {
        pokemonDetailsDiv.innerHTML = `
            <div class="easter-egg">
                <h2>✨ A Wild Mew Appeared! ✨</h2>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png" alt="Mew">
                <p>Psst... You found a secret!</p>
                <p>Mew is said to possess the genetic composition of all Pokémon.</p>
            </div>
        `;
        // Optionally, you could add some special styling in CSS for the .easter-egg class
    }

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPokemon = allPokemonData.filter(pokemon => pokemon.name.includes(searchTerm));
        displayPokemonListInternal(filteredPokemon);
        if (!easterEggTriggered && searchTerm === 'mew') {
            easterEggTriggered = true;
            displayEasterEgg();
        }
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPokemon = allPokemonData.filter(pokemon => pokemon.name.includes(searchTerm));
        displayPokemonListInternal(filteredPokemon);
        if (!easterEggTriggered && searchTerm === 'mew') {
            easterEggTriggered = true;
            displayEasterEgg();
        }
    });

    // Initial fetch
    fetchPokemonList();
})();