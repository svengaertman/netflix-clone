# netflix-clone


## Project Setup

Requires NODE 16+

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

## Architectural decisions
I have the most experience in Vue 2, therefore it seemed only logical to use Vue as framework. I haven't used Vue 3 a lot, but since it is the new default i made this application on Vue 3 and learned on to the go.

Vue 3 uses the new tooling Vite in combination with Pinia as state management and Vitest for testing.

## Testing
I haven't had much experience with tests. In this assessment i started with creating tests in Vitest but after using GSAP i got a "TypeError: _win.matchMedia is not a function". I was unable to fix it before submitting the project, so i disabled GSAP Scrolltrigger (which causes the error) in the SliderSection component.