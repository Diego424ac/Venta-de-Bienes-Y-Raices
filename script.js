// Funciones de autenticación (registro e inicio de sesión)
function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (username && password) {
        // Guardar usuario y contraseña en el localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        switchToLogin();
    } else {
        alert("Por favor ingresa un nombre de usuario y una contraseña.");
    }
}

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (username === savedUsername && password === savedPassword) {
        // Iniciar sesión
        alert("¡Bienvenido de nuevo, " + username + "!");
        startGame();
    } else {
        alert("Nombre de usuario o contraseña incorrectos.");
    }
}

// Cambiar entre la pantalla de registro y la de inicio de sesión
function switchToLogin() {
    document.getElementById("register-container").classList.add("hidden");
    document.getElementById("login-container").classList.remove("hidden");
}

// Iniciar el juego
function startGame() {
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");

    displayHouses(); // Mostrar las casas
}

// Funciones de juego (como antes)
const houses = [
    {
        image: "https://img.freepik.com/foto-gratis/diseno-renderizado-3d-casa_23-2150505820.jpg",
        price: 20,
        name: "Casa 1"
    },
    {
        image: "https://img.freepik.com/free-photo/house-3d-rendering-design_23-2150505826.jpg",
        price: 30,
        name: "Casa 2"
    },
    {
        image: "https://img.freepik.com/psd-gratis/ilustracion-casa-propiedad-3d_23-2151682306.jpg?semt=ais_hybrid",
        price: 50,
        name: "Casa 3"
    },
    {
        image: "https://img.freepik.com/foto-grizado/diseno-renderizado-3d-casa_23-2150505837.jpg?semt=ais_hybrid",
        price: 40,
        name: "Casa 4"
    }
];

let playerTokens = 200; // Tokens iniciales
let playerHouses = []; // Casas compradas por el jugador
let level = 1; // Nivel inicial
let housesToBuy = 5; // Cantidad de casas que se deben comprar para avanzar al siguiente nivel

function displayHouses() {
    const houseList = document.getElementById("house-list");
    houseList.innerHTML = '';
    houses.forEach((house, index) => {
        const houseCard = document.createElement("div");
        houseCard.classList.add("house-card");
        houseCard.innerHTML = `
            <img src="${house.image}" alt="${house.name}">
            <h4>${house.name}</h4>
            <p>Precio: ${house.price} Tokens</p>
            <button onclick="buyHouse(${index})">Comprar</button>
        `;
        houseList.appendChild(houseCard);
    });
}

function buyHouse(index) {
    const house = houses[index];

    if (playerTokens >= house.price) {
        playerTokens -= house.price;
        playerHouses.push(house.name);

        document.getElementById("result-message").innerHTML = `¡Has comprado ${house.name}!`;
        document.getElementById("player-tokens").innerText = playerTokens;

        updatePlayerHouses();

        if (playerHouses.length >= housesToBuy) {
            // Si se compran suficientes casas, se avanza de nivel
            if (level < 3) {
                level++;
                housesToBuy++;
                document.getElementById("level").innerText = level;
                displayHouses(); // Mostrar las casas del nuevo nivel
                document.getElementById("next-level-button").classList.remove("hidden");
            } else {
                endGame(); // Si llegamos al nivel 3, finalizar el juego
            }
        }
    } else {
        document.getElementById("result-message").innerHTML = "¡No tienes suficientes tokens!";
    }
}

function updatePlayerHouses() {
    const houseOwnershipList = document.getElementById("house-ownership-list");
    houseOwnershipList.innerHTML = '';
    playerHouses.forEach(house => {
        const listItem = document.createElement("li");
        listItem.innerText = house;
        houseOwnershipList.appendChild(listItem);
    });
}

function showNextLevelButton() {
    document.getElementById("next-level-button").classList.remove("hidden");
}

function nextLevel() {
    // Se ha eliminado el código redundante para pasar al siguiente nivel aquí
}

function endGame() {
    document.getElementById("game-container").classList.add("hidden");
    document.getElementById("game-end-container").classList.remove("hidden");
}

function redirectToForm() {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSdQ0FlhzdOhS1fPXSQiyoATjdLcBQDD0AETkxKBoaoC_cKAkA/viewform?usp=sharing", "_blank");
}

function reloadTokens() {
    alert("Por favor, realiza una recarga a través del formulario.");
    redirectToForm();
}
