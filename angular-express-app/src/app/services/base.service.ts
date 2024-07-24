import { HttpClient } from '@angular/common/http';

export class BaseService {
  protected apiUrl: string = 'http://localhost:3000';

  constructor(protected http: HttpClient) {}

}
