import { describe, it, expect } from 'vitest';
import {
  add, remove, getOrder, includes,
} from '@/utils/arrays';

describe('array', () => {
  describe('add', () => {
    it('adds item to array if not included', async () => {
      const arrayOfItems = ['first_item', 'second_item', 'third_item'];
      expect(arrayOfItems.length).toBe(3);
      add('fourth_item', arrayOfItems);
      expect(arrayOfItems.length).toBe(4);
      expect(arrayOfItems.includes('fourth_item')).toBe(true);
    });

    it('doesn\'t add item to array if already included', async () => {
      const arrayOfItems = ['first_item', 'second_item', 'third_item'];
      add('first_item', arrayOfItems);
      expect(arrayOfItems.length).toBe(3);
      expect(arrayOfItems.includes('first_item')).toBe(true);
      expect(arrayOfItems.filter((item) => item === 'first_item').length).toBe(1);
    });
  });

  describe('remove', () => {
    it('removes item to array if included', async () => {
      const arrayOfItems = ['first_item', 'second_item', 'third_item'];
      expect(arrayOfItems.length).toBe(3);
      expect(arrayOfItems.includes('first_item')).toBe(true);
      remove('first_item', arrayOfItems);
      expect(arrayOfItems.length).toBe(2);
      expect(arrayOfItems.includes('first_item')).toBe(false);
    });

    it('doesn\'t remove item to array if not included', async () => {
      const arrayOfItems = ['first_item', 'second_item', 'third_item'];
      expect(arrayOfItems.length).toBe(3);
      remove('fourth_item', arrayOfItems);
      expect(arrayOfItems.length).toBe(3);
    });
  });

  describe('getOrder', () => {
    it('returns order-1 if item is first in array', async () => {
      const arrayOfItems = ['first_item', 'second_item', 'third_item'];
      const order = getOrder('first_item', arrayOfItems);
      expect(order).toBe('order-1');
    });
    it('returns order-2 if item is second in array', async () => {
      const arrayOfItems = ['first_item', 'second_item', 'third_item'];
      const order = getOrder('second_item', arrayOfItems);
      expect(order).toBe('order-2');
    });
    it('returns order-3 if item is third in array', async () => {
      const arrayOfItems = ['first_item', 'second_item', 'third_item'];
      const order = getOrder('third_item', arrayOfItems);
      expect(order).toBe('order-3');
    });
    it('returns order-last if item isn\'t in array', async () => {
      const arrayOfItems = ['first_item', 'second_item', 'third_item'];
      const order = getOrder('fourth_item', arrayOfItems);
      expect(order).toBe('order-last');
    });
  });

  describe('includes', () => {
    it('returns true if array includes item', async () => {
      const arrayOfItems = ['first_item', 'second_item', 'third_item'];
      const includesItem = includes(arrayOfItems, 'first_item');
      expect(includesItem).toBe(true);
    });

    it('returns false if array doesn\'t include item', async () => {
      const arrayOfItems = ['first_item', 'second_item', 'third_item'];
      const includesItem = includes(arrayOfItems, 'fourth_item');
      expect(includesItem).toBe(false);
    });
  });
});
