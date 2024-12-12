import { Apollo, gql } from 'apollo-angular';
import { StorageService } from '../services/storage.service';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { GraphqlCertificatesService } from '../services/graphql.certificates.service';
import { GraphqlLanguageService } from '../services/graphql.languages.service';
import { GraphqlEducationService } from '../services/graphql.education.service';
import { GraphqWorkExperienceService } from '../services/graphql.workexperience.service';
import { GraphqlSkillsService } from '../services/graphql.skills.service';
import { GraphqlInterestsService } from '../services/graphql.interests.service';
import { GraphqlHeaderService } from '../services/graphql.header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  certificates: any[]=[];
  Education: any[]= [];
  degrees: any[]=[];
  languages: any[]=[];
  positions: any[] = [];
  skills: any[] = [];
  interests: any[] = [];
  headers: any[] = [];
  token: string = '';

  constructor(
    private certificatesService: GraphqlCertificatesService,
    private educationService: GraphqlEducationService,
    private languagesService: GraphqlLanguageService,
    private workExperienceService : GraphqWorkExperienceService,
    private skillsService : GraphqlSkillsService,
    private interestsService : GraphqlInterestsService,
    private headerService : GraphqlHeaderService,

    private storageService: StorageService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.token = this.storageService.getSession('token');
    if (!this.token) {
      console.error('Token no encontrado. El usuario debe iniciar sesión.');
      alert('Debes iniciar sesión para acceder al dashboard.');
      this.router.navigate(['/login']); // Redirige al login si no hay token
      return;
    }

    this.certificatesService.getCertificates(this.token).subscribe(
      (response: any) => {
        this.certificates = response.data.certificates;
        console.log('Títulos cargados:', this.certificates);
      },
      (error) => {
        console.error('Error al cargar títulos:', error);
      }
    );

    this.educationService.getEducation(this.token).subscribe(
      (response: any) => {
        this.degrees = response.data.degrees;
        console.log('Educacion cargados:', this.degrees);
      },
      (error) => {
        console.error('Error al cargar títulos:', error);
      }
    );
    this.languagesService.getLanguages(this.token).subscribe(
      (response: any) => {
        this.languages = response.data.languages;
        console.log('Languages:', this.languages);
      },
      (error) => {
        console.error('Error al cargar títulos:', error);
      }
    );

    this.workExperienceService.getWorkExperience(this.token).subscribe(
      (response: any) => {
        this.positions = response.data.positions;
        console.log('WorkExperience:', this.positions);
      },
      (error) => {
        console.error('Error al cargar títulos:', error);
      }
    );

    this.skillsService.getSkills(this.token).subscribe(
      (response: any) => {
        this.skills = response.data.skills;
        console.log('Skills:', this.skills);
      },
      (error) => {
        console.error('Error al cargar títulos:', error);
      }
    );

    this.interestsService.getInterests(this.token).subscribe(
      (response: any) => {
        this.interests = response.data.interests;
        console.log('Interests:', this.interests);
      },
      (error) => {
        console.error('Error al cargar títulos:', error);
      }
    );    
    this.headerService.getHeader(this.token).subscribe(
      (response: any) => {
        const headerData = response.data.header;
        this.headers = Array.isArray(headerData) ? headerData : [headerData];
        console.log('Header:', this.headers);
      },
      (error) => {
        console.error('Error al cargar títulos:', error);
      }
    );    

  }
  }
 

