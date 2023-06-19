import { WorkTypeProps } from '@modules/types/domain/work-type';

export const workTypeDataBuilder = (baseEntity = {}): WorkTypeProps => ({
  ...baseEntity,
  name: 'WORKER',
});
