import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment.prod";

export class BaseService {
  protected apiUrl: string = `${environment.apiUrl}`;

  constructor(protected http: HttpClient) {}

}
