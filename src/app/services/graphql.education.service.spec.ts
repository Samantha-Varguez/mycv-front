import { TestBed } from '@angular/core/testing';
import { GraphqlEducationService } from './graphql.education.service';
import { Apollo} from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { of } from 'rxjs';

describe('GraphqlEducationService', () => {
  let service: GraphqlEducationService;
  let apolloSpy: jasmine.SpyObj<Apollo>;

  beforeEach(() => {
    const mockApollo = jasmine.createSpyObj('Apollo', ['query']);

    TestBed.configureTestingModule({
      providers: [
        GraphqlEducationService,
        { provide: Apollo, useValue: mockApollo },
      ],
    });

    service = TestBed.inject(GraphqlEducationService);
    apolloSpy = TestBed.inject(Apollo) as jasmine.SpyObj<Apollo>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Apollo query with the correct parameters', () => {
    const mockToken = 'mockToken123';
    const mockResponse: ApolloQueryResult<any> = {
      data: {
        degrees: [
          {
            id: 1, 
            degree: "UV", 
            endDate: "2024-02-02", 
            startDate: "2023-03-01", 
            university: "UV",
            postedBy: { username: 'MockUser', password: 'MockPassword' },
          },
        ],
      },
      loading: false,
      networkStatus: 7,
      errors: undefined,
    };

    apolloSpy.query.and.returnValue(of(mockResponse));

    service.getEducation(mockToken).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    expect(apolloSpy.query).toHaveBeenCalledWith({
      query: jasmine.any(Object), // Ensure a GraphQL query object is passed
      variables: {},
      context: {
        headers: jasmine.objectContaining({
          Authorization: `JWT ${mockToken}`,
        }),
      },
    });
  });
});
