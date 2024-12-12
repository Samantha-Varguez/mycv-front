import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';


const CREATE_SKILLS_MUTATION = gql`
  mutation MyMutation($idSkills: Int!, $name: String!) {
    createSkills(idSkills: $idSkills, name: $name) {
      idSkills
      name
    }
  }
`;

@Component({
  selector: 'app-skill-form',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent {
  skillForm: FormGroup;

  constructor(private fb: FormBuilder, private apollo: Apollo) {

    this.skillForm = this.fb.group({
      skills: this.fb.array([this.createSkill()]),
    });
  }


  createSkill(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
    });
  }

  get skills() {
    return (this.skillForm.get('skills') as FormArray);
  }

  addSkill() {
    this.skills.push(this.createSkill());
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    if (this.skillForm.valid) {
      const skills = this.skillForm.value.skills;

      skills.forEach((skill: any) => {
        const skillName = skill.skillName;

        this.apollo.mutate({
          mutation: CREATE_SKILLS_MUTATION,
          variables: {
            idSkills: 1,
            name: skillName,
          },
        }).subscribe(
          (response) => {
            console.log('Skill created:', response);
          },
          (error) => {
            console.error('Error creating skill:', error);
          }
        );
      });
    }
  }
}
