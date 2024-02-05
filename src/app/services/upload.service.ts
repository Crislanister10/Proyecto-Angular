import { Injectable } from "@angular/core";
import { Global } from "./global";
import { rejects } from "assert";

@Injectable()
 export class uploadService{

    public url : string
    constructor(){
            this.url = Global.url
        }
    //metodo para hacer una peticion Ajax clasica, pero donde vamos a añadir un archivo
   //permitira subir archivos al backend
    makeFileRequest(url:string,  params: Array<string> , files:Array<File>, name:string){
        return new Promise((resolve ,reject) => {
            //simulamos un formulario en un objeto
            var formData:any = new FormData()
            // contendra peticiones HTTP
            var xhr = new XMLHttpRequest()
            //recorrer los archivos que puedan estar llegando
            for (var i = 0; i < files.length; i++) {
                formData.append(name, files[i] , files[i].name)  
            }
            xhr.onreadystatechange = ()=>{
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response))
                    }else{
                        reject(xhr.response)
                    }
                }
            }

            xhr.open('POST', url, true)
            xhr.send(formData)
        })
    }
    }