import { TestBed } from '@angular/core/testing';
import { GraphqlCertificatesService } from './graphql.certificates.service';
import { Apollo} from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { of } from 'rxjs';

describe('GraphqlCertificatesService', () => {
  let service: GraphqlCertificatesService;
  let apolloSpy: jasmine.SpyObj<Apollo>;

  beforeEach(() => {
    const mockApollo = jasmine.createSpyObj('Apollo', ['query']);

    TestBed.configureTestingModule({
      providers: [
        GraphqlCertificatesService,
        { provide: Apollo, useValue: mockApollo },
      ],
    });

    service = TestBed.inject(GraphqlCertificatesService);
    apolloSpy = TestBed.inject(Apollo) as jasmine.SpyObj<Apollo>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Apollo query with the correct parameters', () => {
    const mockToken = 'mockToken123';
    const mockResponse: ApolloQueryResult<any> = {
      data: {
        certificates: [
          {
            id: 1,
            institution: 'Mock Institution',
            title: 'Mock Title',
            year: 2022,
            postedBy: { username: 'MockUser', password: 'MockPassword' },
          },
        ],
      },
      loading: false,
      networkStatus: 7,
      errors: undefined,
    };

    apolloSpy.query.and.returnValue(of(mockResponse));

    service.getCertificates(mockToken).subscribe((response) => {
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

