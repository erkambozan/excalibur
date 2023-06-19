import { HierarchyTypeProps } from '@modules/types/domain/hierarchy-type';

export const hierarchyDataBuilder = (baseEntity = {}): HierarchyTypeProps => ({
  ...baseEntity,
  name: 'MAIN',
});
