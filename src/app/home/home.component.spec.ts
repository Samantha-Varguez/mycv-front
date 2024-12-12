import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { of, throwError } from 'rxjs';
import { GraphqlCertificatesService } from '../services/graphql.certificates.service';
import { GraphqlEducationService } from '../services/graphql.education.service';
import { GraphqlLanguageService } from '../services/graphql.languages.service';
import { GraphqWorkExperienceService } from '../services/graphql.workexperience.service';
import { GraphqlSkillsService } from '../services/graphql.skills.service';
import { GraphqlInterestsService } from '../services/graphql.interests.service';
import { GraphqlHeaderService } from '../services/graphql.header.service';
import { ApolloQueryResult } from '@apollo/client/core'; 

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let certificatesServiceSpy: jasmine.SpyObj<GraphqlCertificatesService>;
  let educationServiceSpy: jasmine.SpyObj<GraphqlEducationService>;
  let languagesServiceSpy: jasmine.SpyObj<GraphqlLanguageService>;
  let workExperienceServiceSpy: jasmine.SpyObj<GraphqWorkExperienceService>;
  let skillsServiceSpy: jasmine.SpyObj<GraphqlSkillsService>;
  let interestsServiceSpy: jasmine.SpyObj<GraphqlInterestsService>;
  let headerServiceSpy: jasmine.SpyObj<GraphqlHeaderService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['getSession']);
    certificatesServiceSpy = jasmine.createSpyObj('GraphqlCertificatesService', ['getCertificates']);
    educationServiceSpy = jasmine.createSpyObj('GraphqlEducationService', ['getEducation']);
    languagesServiceSpy = jasmine.createSpyObj('GraphqlLanguageService', ['getLanguages']);
    workExperienceServiceSpy = jasmine.createSpyObj('GraphqWorkExperienceService', ['getWorkExperience']);
    skillsServiceSpy = jasmine.createSpyObj('GraphqlSkillsService', ['getSkills']);
    interestsServiceSpy = jasmine.createSpyObj('GraphqlInterestsService', ['getInterests']);
    headerServiceSpy = jasmine.createSpyObj('GraphqlHeaderService', ['getHeader']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: GraphqlCertificatesService, useValue: certificatesServiceSpy },
        { provide: GraphqlEducationService, useValue: educationServiceSpy },
        { provide: GraphqlLanguageService, useValue: languagesServiceSpy },
        { provide: GraphqWorkExperienceService, useValue: workExperienceServiceSpy },
        { provide: GraphqlSkillsService, useValue: skillsServiceSpy },
        { provide: GraphqlInterestsService, useValue: interestsServiceSpy },
        { provide: GraphqlHeaderService, useValue: headerServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login if no token is found', () => {
    storageServiceSpy.getSession.and.returnValue(null);

    component.ngOnInit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should load certificates data on init', () => {
    const mockCertificates: ApolloQueryResult<{ certificates: { id: number; title: string }[] }> = {
      data: { certificates: [{ id: 1, title: 'Mock Certificate' }] },
      loading: false,
      networkStatus: 7,
    };
    storageServiceSpy.getSession.and.returnValue('mock-token');
    certificatesServiceSpy.getCertificates.and.returnValue(of(mockCertificates));
  
    component.ngOnInit();
  
    expect(certificatesServiceSpy.getCertificates).toHaveBeenCalledWith('mock-token');
    expect(component.certificates).toEqual(mockCertificates.data.certificates);
  });

  it('should handle certificates service error', () => {
    storageServiceSpy.getSession.and.returnValue('mock-token');
    certificatesServiceSpy.getCertificates.and.returnValue(throwError(() => new Error('Service error')));

    component.ngOnInit();

    expect(certificatesServiceSpy.getCertificates).toHaveBeenCalledWith('mock-token');
    expect(component.certificates).toEqual([]);
  });

  it('should load education data on init', () => {
    const mockEducation: ApolloQueryResult<{ degrees: { id: number; degree: string }[] }> = {
      data: { degrees: [{ id: 1, degree: 'Mock Degree' }] },
      loading: false,
      networkStatus: 7,
    };
    
    educationServiceSpy.getEducation.and.returnValue(of(mockEducation));    
    expect(component.degrees).toEqual(mockEducation.data.degrees);
  });

  it('should handle education service error', () => {
    storageServiceSpy.getSession.and.returnValue('mock-token');
    educationServiceSpy.getEducation.and.returnValue(throwError(() => new Error('Service error')));

    component.ngOnInit();

    expect(educationServiceSpy.getEducation).toHaveBeenCalledWith('mock-token');
    expect(component.degrees).toEqual([]);
  });

  it('should load interests data on init', () => {
    const mockInterests: ApolloQueryResult<{ interests: { id: number; name: string }[] }> = {
      data: { interests: [{ id: 1, name: 'Programming' }] },
      loading: false,
      networkStatus: 7,
    };

    storageServiceSpy.getSession.and.returnValue('mock-token');
    interestsServiceSpy.getInterests.and.returnValue(of(mockInterests));
  
    component.ngOnInit();
  
    expect(interestsServiceSpy.getInterests).toHaveBeenCalledWith('mock-token');
    expect(component.interests).toEqual(mockInterests.data.interests);
  });

  it('should handle interests service error', () => {
    storageServiceSpy.getSession.and.returnValue('mock-token');
    interestsServiceSpy.getInterests.and.returnValue(throwError(() => new Error('Service error')));

    component.ngOnInit();

    expect(interestsServiceSpy.getInterests).toHaveBeenCalledWith('mock-token');
    expect(component.interests).toEqual([]);
  });
  
});

