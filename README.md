# Fintoc Front

🐳

## Requirements

**We will be using `npm` for this repository**. I pinned the minimum `npm` version to `v8.0.0` so that we have almost the same `npm` version and the `package-lock.json` file doesn't get messed up every time someone runs `npm install`. Also, you need `node` with a version equal or higher than `16.0.0`.

## Running the dev server

To run the dev server, just execute:

```sh
$ npm run dev
```

You should be able to navigate to `http://localhost:8000` and see the `Home` component with its counters.

## Linters

There are two types of linters in the project: linters for code and linters for style. You can run them separately:

```sh
$ npm run lint:js   # code

$ npm run lint:css  # style
```

You can also run them at the same time:

```sh
$ npm run lint
```

## Aliases

By default, I configured a common alias: `@ => src/`. This helps avoid imports that look like this:

```vue
<script setup lang="ts">
import MyComponent from '../../../../../../../../MyComponent.vue';
</script>
```

And makes it look more like this:

```vue
<script setup lang="ts">
import MyComponent from '@/MyComponent.vue';
</script>
```

More aliases can be created (this is only documented so we know why there are some random `@` aliases everywhere, as I don't think more aliases are required). New aliases need to be configured in three locations:

1. `vite.config.js`: Here you can add a new entry to `resolve.alias` where the key corresponds to the alias and the value corresponds to the actual location. The value must be **an absolute path**, starting from the base of the repository. This points the compiler to the correct location.
2. `.eslintrc.js`: Here you need to add a new element to the `settings['import/resolver'].alias.map` array, that itself corresponds to an array with two elements. The first element corresponds to the alias and the second element corresponds to the actual location. The second element must be **a relative path**, starting from the base of the repository. This tells `ESLint` to chill when it sees `@` as a starting point for a path and to understand where it points.
3. `tsconfig.json`: Here you need to add a new entry to `compilerOptions.paths` where the key corresponds to the alias and the value corresponds to the actual location. The value must be **a relative path**, starting from the base of the repository. Notice that here you must finish the key **and** the value with `/*` for vscode to understand you are referencing folders and autocomplete sub-folders and files. This is to give the editor autocomplete support.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
