import { ResponseBase } from '@libs/api/response.base';

export class AnnualLeaveResponse extends ResponseBase {
  startDate: Date;
  endDate: Date;
  userId: string;
  status: string;
}
