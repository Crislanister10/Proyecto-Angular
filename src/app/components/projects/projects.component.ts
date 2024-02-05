import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Project } from '../../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  providers:[
    ProjectService
  ]
})
export class ProjectsComponent implements OnInit {
      public projects : Project[]
      public url : string
      constructor(private _projecService: ProjectService){
        this.projects=[]
        this.url = Global.url
      }
      ngOnInit(): void {
        
       this.getProject()
      }

      getProject(){

          this._projecService.getProjects().subscribe(
            responses =>{

              if(responses.project){
                this.projects= responses.projects  
                     
              }
              console.log(responses)
            },err =>{
              console.log(<any>err)
            }
          )
          
      }
}
