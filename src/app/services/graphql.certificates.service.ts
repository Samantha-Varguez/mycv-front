import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';

const CERTIFICATES_QUERY = gql`
query CertificatesQuery{
  certificates(search: "*") {
    id
    institution
    title
    year
    postedBy
    {
    username
    password
    }
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class GraphqlCertificatesService {

  constructor(private apollo: Apollo) { }

  getCertificates(mytoken: string) {
    
      return this.apollo.query({
        query: CERTIFICATES_QUERY,
        variables: {
        }, 
        context: {
          // example of setting the headers with context per operation
          headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
        },
      });
    //}
  
  }
}