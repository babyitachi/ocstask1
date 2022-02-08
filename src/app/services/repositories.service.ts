import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrgProduct } from '../models/orgProduct.model';
import { RepoDetails } from '../models/RepoDetails.model';

@Injectable({ providedIn: 'root' })
export class RepositoriesService {
  constructor(private httpClient: HttpClient) { }

  getReps(repoDetails: RepoDetails): Observable<any> {
    return this.httpClient
      .get(`https://api.github.com/search/repositories?q=user:${repoDetails.organization.toLocaleLowerCase()}&sort=forks&per_page=${repoDetails.n.toString()}&page=1`);
  }

  getForks(productDetail: OrgProduct): Observable<any> {
    return this.httpClient.get(`https://api.github.com/repos/${productDetail.organization.toLocaleLowerCase()}/${productDetail.product.toLocaleLowerCase()}/forks?sort=oldest`);
  }
}
