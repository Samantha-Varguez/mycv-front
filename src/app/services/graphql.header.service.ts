import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';

const HEADER_QUERY = gql`
query HeaderQuery {
  header {
    url
    id
    title
    description
    phone
    address
    email
    socialmedia
    postedBy {
      username
      password
    }
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class GraphqlHeaderService {

  constructor(private apollo: Apollo) { }

  getHeader(mytoken: string) {
    
      return this.apollo.query({
        query: HEADER_QUERY,
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