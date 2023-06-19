import { ResponseBase } from '@libs/api/response.base';

export class HierarchyResponse extends ResponseBase {
  parentId: number;
  name: string;
  path: string;
  type: string;
}
