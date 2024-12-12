import { Component } from '@angular/core';
import { GraphqlEducationService } from '../services/graphql.education.service';
import { Subscription} from 'rxjs';
import { StorageService } from "../services/storage.service";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {

  constructor(
    private storageService : StorageService,
    private graphqlEducationService: GraphqlEducationService,
) 
{}

  arrEducation = [];
  loading: boolean;
  token : string = "";

  private querySubscription: Subscription;    
    
  ngAfterViewInit(): void {
    this.getEducation();
   
  }

  public getEducation()
  {
   this.token = this.storageService.getSession("token");

   this.querySubscription = this.graphqlEducationService.getEducation(this.token)
    //.valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.arrEducation = JSON.parse(JSON.stringify(data)).degrees;
      console.log(JSON.stringify(this.arrEducation))
    });


  }

}
