# Form Components

This folder includes the generic form components to be used throughout the Dashboard. Currently the available components are:

- `GenericInput`
- `GenericForm`

The main idea is that the form components include _automagic_ validations and change state without explicitly stating when to do so, to help the developer focus on the business logic instead of the code itself.

## `GenericInput`

You can read the `GenericInput` props and emit expectations at the top of the [component file](./GenericInput.vue).

To validate an input, you can pass the prop `validate` that corresponds to an array of functions. Each function receives a string as a parameter (representing the content of the input itself) and should return either `true` or an error string. If the content of the string meets the expectations set by the validation, return `true`. If the content of the string is invalid, return a string. Each validation will be run sequentially, starting with the first element of the `validate` array.

Each `GenericInput` component also contains a `valid` exposed attribute, which corresponds to the state of the validations for said input. You can access this attribute by setting a `ref` on the input component and then directly calling the attribute.

Let's see an example:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { GenericInputPublicAPI } from '@/interfaces/components/forms/GenericInput';
import GenericInput from '@/components/forms/GenericInput.vue';

const validations = [
  (email) => !!email.trim() || 'No empty email',
  (email) => email.includes('@') || 'Invalid email',
];

const emailInput = ref<GenericInputPublicAPI | null>(null);

const submit = () => {
  if (emailInput.value?.valid) {
    // do something to submit the input
  }
}
</script>

<template>
  <GenericInput
    ref="emailInput"
    :validate="validations"
  />
</template>
```

Notice how we declared the `ref` type as `GenericInputPublicAPI | null`. A type `GenericInputPublicAPI` exists that encapsulates everything that a `ref` for a `GenericInput` should contain so that you don't have to extrapolate its type from meta-stuff.

When calling `emailInput.value?.valid`, you will receive a boolean representing whether the validations set for the input passed or not. Please note that the validations are **watched**, which means that they will run when **something changes** (either the validations themselves or the input value), and not when calling `validate`. This means that you can safely reuse the `.valid` attribute multiple times in the same method without re-running the validations all over again.

## `GenericTextArea`

You can read the `GenericTextArea` props and emit expectations at the top of the [component file](./GenericTextArea.vue).

To validate a textarea, you can pass the prop `validate` that corresponds to an array of functions. Each function receives a string as a parameter (representing the content of the textarea itself) and should return either `true` or an error string. If the content of the string meets the expectations set by the validation, return `true`. If the content of the string is invalid, return a string. Each validation will be run sequentially, starting with the first element of the `validate` array.

Each `GenericTextArea` component also contains a `valid` exposed attribute, which corresponds to the state of the validations for said textarea. You can access this attribute by setting a `ref` on the textarea component and then directly calling the attribute.

Let's see an example:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { GenericTextAreaPublicAPI } from '@/interfaces/components/forms/GenericTextArea';
import GenericTextArea from '@/components/forms/GenericTextArea.vue';

const validations = [
  (text) => !!text.trim() || 'No empty text',
];

const text = ref<GenericTextAreaPublicAPI | null>(null);

const submit = () => {
  if (text.value?.valid) {
    // do something to submit the textarea
  }
}
</script>

<template>
  <GenericTextArea
    ref="text"
    :validate="validations"
  />
</template>
```

Notice how we declared the `ref` type as `GenericTextAreaPublicAPI | null`. A type `GenericTextAreaPublicAPI` exists that encapsulates everything that a `ref` for a `GenericTextArea` should contain so that you don't have to extrapolate its type from meta-stuff.

When calling `text.value?.valid`, you will receive a boolean representing whether the validations set for the textarea passed or not. Please note that the validations are **watched**, which means that they will run when **something changes** (either the validations themselves or the textarea value), and not when calling `validate`. This means that you can safely reuse the `.valid` attribute multiple times in the same method without re-running the validations all over again.

## `GenericForm`

You can read the `GenericForm` props and emit expectations at the top of the [component file](./GenericForm.vue).

Forms contain validatable inputs inside it. They group validations in one place so that you can simply check if the whole form is valid instead of checking validity input by input.

Each `GenericForm` component also contains a `valid` exposed attribute, which corresponds to the state of the validations of the inputs inside of said form. You can access this attribute by setting a `ref` on the form component and then directly calling the attribute.

Let's see an example:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { GenericFormPublicAPI } from '@/interfaces/components/forms/GenericForm';
import GenericForm from '@/components/forms/GenericForm.vue';
import GenericInput from '@/components/forms/GenericInput.vue';
import GenericTextArea from '@/components/forms/GenericTextArea.vue';

const emailValidations = [
  (email) => !!email.trim() || 'No empty email',
  (email) => email.includes('@') || 'Invalid email',
];

const urlValidations = [
  (url) => !!url.trim() || 'No empty URL',
  (url) => url.includes('https://') || 'Invalid URL schema',
];

const descriptionValidations = [
  (text) => !!text.trim() || 'No empty description',
]

const form = ref<GenericFormPublicAPI | null>(null);

const submit = () => {
  if (form.value?.valid) {
    // do something to submit the form
  }
}
</script>

<template>
  <GenericForm ref="form">
    <GenericInput :validate="emailValidations" />
    <GenericInput :validate="urlValidations" />
    <GenericTextArea :validate="descriptionValidations" />
  </GenericForm>
</template>
```

Notice how we declared the `ref` type as `GenericFormPublicAPI | null`. A type `GenericFormPublicAPI` exists that encapsulates everything that a `ref` for a `GenericForm` should contain so that you don't have to extrapolate its type from meta-stuff.

When calling `form.value?.valid`, you will receive a boolean representing whether the validations set for **every validatable input inside the form** passed or not.
