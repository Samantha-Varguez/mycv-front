import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';

const INTERESTS_QUERY = gql`
 query InterestsQuery {
  interests(search: "*") {
    id
    name
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
export class GraphqlInterestsService {

  constructor(private apollo: Apollo) { }

  getInterests(mytoken: string) {
    
      return this.apollo.query({
        query: INTERESTS_QUERY,
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