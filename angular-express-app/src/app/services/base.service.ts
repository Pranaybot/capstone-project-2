import { HttpClient } from '@angular/common/http';

export class BaseService {
  protected apiUrl: string = '/api';

  constructor(protected http: HttpClient) {}

}
