import { computed, ref, watch } from 'vue';

export type Validation<T> = (value: T) => true | string;

export type ValidatePropType<T> = Array<Validation<T>>
export type ModelValuePropType<T> = T

export type ValidatedModelProps<ModelType> = {
  validate: ValidatePropType<ModelType>,
  modelValue: ModelValuePropType<ModelType>,
};

export const makeValidatedModelPropsDefaults = <ModelType>() => ({
  validate: () => [] as Array<Validation<ModelType>>,
});

export const useValidatedModel = <T>(props: ValidatedModelProps<T>) => {
  const validating = ref(false);
  const error = ref('');
  const internalValid = computed(() => !error.value.trim());

  const startValidating = () => {
    validating.value = true;
  };

  const validate = () => {
    if (!validating.value) {
      return;
    }
    const validated = props.validate.map((validation) => validation(props.modelValue));
    const errors = validated.filter((possible) => possible !== true) as Array<string>;
    if (!errors.length) {
      error.value = '';
    } else {
      error.value = errors[0];
    }
  };

  watch([() => props.modelValue, () => props.validate, validating], validate);

  const externalValid = computed(() => {
    if (!validating.value) {
      startValidating();
      validate();
    }
    return internalValid.value;
  });

  return {
    validate,
    startValidating,
    valid: externalValid,
    internalValid,
    error,
  };
};
