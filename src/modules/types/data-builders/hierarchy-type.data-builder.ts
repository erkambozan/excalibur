import { HierarchyTypeProps } from '@modules/types/domain/hierarchy-type';
import { BaseEntityProps } from '@libs/ddd/entity.base';

export const hierarchyDataBuilder = (
  baseEntity: BaseEntityProps,
): HierarchyTypeProps => ({
  ...baseEntity,
  name: 'MAIN',
});
