import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';

const WORKEXPERIENCE_QUERY = gql`
  query WorkExperienceQuery {
  positions(search: "*") {
    company
    description
    endDate
    position
    location
    id
    startDate
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
export class GraphqWorkExperienceService {

  constructor(private apollo: Apollo) { }

  getWorkExperience(mytoken: string) {
    
      return this.apollo.query({
        query: WORKEXPERIENCE_QUERY,
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