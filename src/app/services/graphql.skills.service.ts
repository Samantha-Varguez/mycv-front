import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';

const SKILLS_QUERY = gql`
  query SkillsQuery {
  skills(search: "*") {
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
export class GraphqlSkillsService {

  constructor(private apollo: Apollo) { }

  getSkills(mytoken: string) {
    
      return this.apollo.query({
        query: SKILLS_QUERY,
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