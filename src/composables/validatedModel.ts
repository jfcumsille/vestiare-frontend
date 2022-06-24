import { computed, ref, watch } from 'vue';

export type Validation<T> = (value: T) => true | string;

export type ValidatePropType<T> = Array<Validation<T>>
export type ModelValuePropType<T> = T

export type ValidatedModelProps<ModelType> = {
  validations: ValidatePropType<ModelType>,
  modelValue: ModelValuePropType<ModelType>,
};

export const makeValidatedModelPropsDefaults = <ModelType>() => ({
  validations: () => [] as Array<Validation<ModelType>>,
});

export const useValidatedModel = <T>(props: ValidatedModelProps<T>) => {
  const validating = ref(false);
  const error = ref('');
  const internalValid = computed(() => !error.value.trim());

  const startValidating = () => {
    validating.value = true;
  };

  const validateModel = () => {
    if (!validating.value) {
      return;
    }
    const validated = props.validations.map((validation) => validation(props.modelValue));
    const errors = validated.filter((possible) => possible !== true) as Array<string>;
    if (!errors.length) {
      error.value = '';
    } else {
      error.value = errors[0];
    }
  };

  watch([() => props.modelValue, () => props.validations, validating], validateModel);

  const externalValid = computed(() => {
    if (!validating.value) {
      startValidating();
      validateModel();
    }
    return internalValid.value;
  });

  return {
    startValidating,
    valid: externalValid,
    internalValid,
    error,
    validating,
  };
};
