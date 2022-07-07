import { HolderType, Product } from '@/interfaces/utilities/enums';
import { OrganizationProduct } from '@/interfaces/entities/organizationProduct';

export const isProductAvailable = (
  code: Product,
  holderType: HolderType,
  products: Array<OrganizationProduct> | undefined = undefined,
) => {
  if (!products) {
    return false;
  }
  const product = products.find(
    (prod) => prod.product === code && prod.holderType === holderType,
  );
  return !!product?.enabled;
};
