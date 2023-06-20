import { HierarchyProps } from '@modules/hierarchy/domain/hierarchy';
import { BaseEntityProps } from '@libs/ddd/entity.base';

export const hierarchyDataBuilder = (
  baseEntity = {} as BaseEntityProps,
): HierarchyProps => ({
  ...baseEntity,
  name: 'Tommy Life',
  type: 'MAIN',
  parentId: 1,
  parentPath: '1',
  path: '1.1',
});
