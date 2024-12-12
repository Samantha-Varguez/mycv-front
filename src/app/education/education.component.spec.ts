import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EducationComponent } from './education.component';
import { GraphqlEducationService } from '../services/graphql.education.service';
import { StorageService } from '../services/storage.service';
import { of } from 'rxjs';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  // Mock Services
  const mockStorageService = {
    getSession: jasmine.createSpy('getSession').and.returnValue('mockToken')
  };

  const mockGraphqlEducationService = {
    getEducation: jasmine.createSpy('getEducation').and.returnValue(
      of({
        data: { degrees: [{ id: 1, name: 'Mock Degree' }] },
        loading: false
      })
    )
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationComponent],
      providers: [
        { provide: StorageService, useValue: mockStorageService },
        { provide: GraphqlEducationService, useValue: mockGraphqlEducationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEducation on ngAfterViewInit and populate arrEducation', () => {
    spyOn(component, 'getEducation').and.callThrough();

    // Trigger lifecycle hooks
    fixture.detectChanges();

    // Check if getEducation is called
    expect(component.getEducation).toHaveBeenCalled();

    // Verify that the service was called with the correct token
    expect(mockGraphqlEducationService.getEducation).toHaveBeenCalledWith('mockToken');

    // Verify that arrEducation is populated
    expect(component.arrEducation).toEqual([{ id: 1, name: 'Mock Degree' }]);
  });

  it('should handle loading state correctly', () => {
    // Trigger lifecycle hooks
    fixture.detectChanges();

    // Verify that the loading state is set
    expect(component.loading).toBeFalse();
  });
});
