import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { uploadService } from '../../services/upload.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers:[
    ProjectService,
    uploadService
  ]
})
export class CreateComponent implements OnInit{
  
  public title: string
  public project: Project
  public status : string
  public filesToUpload:Array<File>
 

  constructor(
    private _projectService : ProjectService,
    private _uploadService : uploadService
    ){

    this.title ="Crear proyecto"
    this.project = new Project( "","","","", 2019,"","",)
    this.status=''
    this.filesToUpload = new Array<File>
  }

  ngOnInit(): void {
    
  }
  onSubmit(form:any){
      //guardar losd datos
      this._projectService.saveProject(this.project).subscribe(
          response =>{
              console.log(response)

              if (response) {
                //subir la imagen
                this._uploadService.makeFileRequest(
                  Global.url+'upload-image/'+response.project._id, [] ,this.filesToUpload, 'image')
                  .then((result:any)=>{

                    console.log(result+"creado correctamente")
                    
                    this.status = 'succes'
                    form.reset()
                    
                  })
                  }else{
                    this.status =' failed'
                  }
                },err =>{
                    console.log(<any>err)
                })         
        }     
  
     fileChangeEvent(fileInput:any){

      //obetener datos cuando se seleccione el arrchivo
      //lo preparo, lo forzo a que el array sea de tipo File
      this.filesToUpload= <Array<File>>fileInput.target.files//files son todos los archivos que seleccionamos con el Input
    
    }
 
}
