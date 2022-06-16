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

### Explanation
#### Home screen / overview
I have made an overview of the first 250 shows from the initial API call: Index. Filtered all of it by genre and displayed only if there are more than 6 items in that genre. Each genre on the overview has max. 15 items sorted on rating (high to low).

The popular slider on the homescreen is based of all 250 shows and only displays the top 6 based on rating.
You can click each of the cards to go the the specific show, or you can click on a genre title to go to the specific genre overview. This can also be done by clicking on specific genre in the dropdown in the navbar.

#### Genre overview
In this overview all of the shows per genre are displayed in similar cards as the home screen. Clicking on a card pushes the router to the specific show page.

#### Single show page
On this page you can find the specific show. A new API call is being done so you can also refresh on this page and still get the data. It also returns a API call with all the episides which are begin shown below the regular information. The genre labels are again clickable and link to the genre overview page.

#### Search
The search in the navbar does a direct API call based on the information given. If there is no result from the API it gives an alert error. If it has a result, or multiple results, it selects the one with the best matching score and pushes the router to that page with the information. The search is not constrained to the first 250 shows from the API.

## Testing
I haven't had much experience with tests. In this assessment i started with creating tests in Vitest but after using GSAP i got a "TypeError: _win.matchMedia is not a function". I was unable to fix it before submitting the project, so i disabled GSAP Scrolltrigger (which causes the error) in the SliderSection component.