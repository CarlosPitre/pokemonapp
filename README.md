# pokemon_app

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Libraries

Icons [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome).

ClientHttp [Axios](https://github.com/axios/axios).

### Folder's Organization

- _API_: It contains the HTTP provider and its interface, for this project Axios is used. This HTTP provider will be responsible for exposing all HTTP methods such as Get, Post, Update, Delete, to be injected to a domain client and perform the respective HTTP calls. That is why this HTTP provider receives generic parameters, to be reused by all the Domain clients of the APP.

- _CLIENTS_: It is the communication from the outside world with my application. Clients are responsible for mapping HTTP requests to be used in a domain language throughout the application.

- _COMPONENTS_: It contains all the components of my application, these components are granular so they contain very little logic focused on the design or in the case of Pokemondetail Component contains logic to execute Vuex Store Actions.

- _TYPES_: This project is using Typescript so it is recommended to type the domain of the application, in this folder you find all the type statements.

- _STORE_: Contains the Vuex Store with its actions and mutations

```
.
|-- App.vue
|-- api
|   |-- AxiosHttpClient.ts
|   `-- HttpProvider.ts
|-- assets
|   |-- Loader.svg
|   |-- header-detail.svg
|   |-- logo.png
|   `-- pikachu-home.svg
|-- clients
|   |-- Mock.ts
|   `-- pokemonClient.ts
|-- components
|   |-- ButtonPrimary.vue
|   |-- ButtonTab.vue
|   |-- Loading.vue
|   |-- Modal.vue
|   |-- PodemonDetail.vue
|   |-- PokemonItem.vue
|   `-- PokemonList.vue
|-- main.ts
|-- router
|   `-- index.ts
|-- shims-vue.d.ts
|-- store
|   `-- index.ts
|-- types
|   |-- GetPokemons.ts
|   `-- Pokemon.ts
`-- views
    |-- Home.vue
    `-- PokemonContainer.vue
```

