import { describe, it, expect } from 'vitest';
import { artificialWait } from '@/utils/tests/common';
import { useValidatedModel, Validation, ValidatedModelProps } from '@/composables/validatedModel';

const EMPTY_ERROR = 'Text empty';
const NO_AT_ERROR = 'No \'@\' character';

const validations: Array<Validation<string>> = [
  (text) => !!text.trim() || EMPTY_ERROR,
  (text) => text.includes('@') || NO_AT_ERROR,
];

const propsFactory = () => <ValidatedModelProps<string>>({
  validations,
  modelValue: '',
});

describe('useValidation', () => {
  describe('on initial state', () => {
    it('starts with an internal valid value', () => {
      const {
        internalValid,
        error,
      } = useValidatedModel(propsFactory());

      expect(internalValid.value).toBe(true);
      expect(error.value).toBe('');
    });

    it('\'valid\' attribute reads activates validation and returns correct status', () => {
      const {
        valid,
        internalValid,
        error,
      } = useValidatedModel(propsFactory());

      const externalValidValue = valid.value;

      expect(internalValid.value).toBe(false);
      expect(error.value).toBe(EMPTY_ERROR);
      expect(valid.value).toBe(false);
      expect(valid.value).toEqual(externalValidValue);
    });

    it('\'startValidating\' activates validation and returns correct status', async () => {
      const {
        startValidating,
        valid,
        internalValid,
        error,
      } = useValidatedModel(propsFactory());

      startValidating();

      // The validation takes 1 millisecond, so the validity
      // may be wrong for that milisecond
      await artificialWait();

      expect(valid.value).toBe(false);
      expect(internalValid.value).toBe(false);
      expect(error.value).toBe(EMPTY_ERROR);
    });
  });

  describe('on model changes', () => {
    it('reruns validations', async () => {
      const props = propsFactory();
      const { valid } = useValidatedModel(props);

      expect(valid.value).toBe(false);

      props.modelValue = 'Valid @ string!';

      // The validation takes 1 millisecond, so the validity
      // may be wrong for that milisecond
      await artificialWait();

      expect(valid.value).toBe(true);
    });
  });
});
