import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';

const LANGUAGES_QUERY = gql`
 query LanguagesQuery {
  languages(search: "*") {
    id
    language
    level
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
export class GraphqlLanguageService {

  constructor(private apollo: Apollo) { }

  getLanguages(mytoken: string) {
    
      return this.apollo.query({
        query: LANGUAGES_QUERY,
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