import { describe, it, expect } from 'vitest';
import { getOrder } from '@/utils/sets';

describe('array', () => {
  describe('getOrder', () => {
    it('returns order-1 if item is first in array', async () => {
      const arrayOfItems = new Set(['first_item', 'second_item', 'third_item']);
      const order = getOrder('first_item', arrayOfItems);
      expect(order).toBe('order-1');
    });
    it('returns order-2 if item is second in array', async () => {
      const arrayOfItems = new Set(['first_item', 'second_item', 'third_item']);
      const order = getOrder('second_item', arrayOfItems);
      expect(order).toBe('order-2');
    });
    it('returns order-3 if item is third in array', async () => {
      const arrayOfItems = new Set(['first_item', 'second_item', 'third_item']);
      const order = getOrder('third_item', arrayOfItems);
      expect(order).toBe('order-3');
    });
    it('returns order-last if item isn\'t in array', async () => {
      const arrayOfItems = new Set(['first_item', 'second_item', 'third_item']);
      const order = getOrder('fourth_item', arrayOfItems);
      expect(order).toBe('order-last');
    });
  });
});
