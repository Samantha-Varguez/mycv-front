import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';

const EDUCATION_QUERY = gql`
  query EducationQuery {
  degrees(search: "*") {
    degree
    endDate
    id
    startDate
    university
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
export class GraphqlEducationService {

  constructor(private apollo: Apollo) { }

  getEducation(mytoken: string) {
    
      return this.apollo.query({
        query: EDUCATION_QUERY,
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