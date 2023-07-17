import { ResponseBase } from '@libs/api/response.base';

export class EmployeeResponse extends ResponseBase {
  hierarchyId: number;
  hierarchyPath: string;
  workType: string;
  userId: string;
}
