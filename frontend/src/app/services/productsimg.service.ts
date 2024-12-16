import { Injectable } from '@angular/core';
import { Img } from '../nlr/interfaces/files';
import { ref, Storage, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsimgService {

  name_file: Img[] = [];

  constructor(private storage: Storage) {
  }

  verificarFirebase(): Promise<string>{
    return new Promise((resolve, reject) => {
      const imagenRef = ref(this.storage, 'nlr/productos'); // referencia de la carpeta de productos

      listAll(imagenRef) // descarga todo el listado de las imagenes de la carpeta
          .then(res => {
              for (let item of res.items) {
                  const existe = this.name_file.some(img => img.name_ruta === item.fullPath);
                  if (existe) {
                      return resolve('existe'); // Resuelve la promesa si existe
                  }
              }
              resolve('false'); // Resuelve la promesa si no existe
          })
          .catch(error => {
              console.error(error);
              reject(error); // Rechaza la promesa en caso de error
          });
    });
  }

  async setFile(credentials: Img){
    this.name_file = [];
    this.name_file.push(credentials);
    return await this.verificarFirebase();
  }

  getFile(credentials: string){
    // hacer una preguna o una advertencia de que el valor existe
    return credentials;
  }

  saveFile(): Promise<string>{
    const fileRef = ref(this.storage, `${this.name_file[0].name_ruta}`);
    let url = '';
    return uploadBytes(fileRef, this.name_file[0].file)
    .then(
      async res => {
        console.log(res)
        url = await getDownloadURL(fileRef);
        //return this.getFile(url);
        return url;
      })
    .catch(
      error => {
        console.log(error)
        return 'error';
      });
  }

  setimg(){
    return Promise.resolve(this.saveFile());
  }

  // SERVICIOS
  verificarFirebaseImg(): Promise<string>{
    return new Promise((resolve, reject) => {
      const imagenRef = ref(this.storage, 'nlr/servicios'); // referencia de la carpeta de productos

      listAll(imagenRef) // descarga todo el listado de las imagenes de la carpeta
          .then(res => {
              for (let item of res.items) {
                  const existe = this.name_file.some(img => img.name_ruta === item.fullPath);
                  if (existe) {
                      return resolve('existe'); // Resuelve la promesa si existe
                  }
              }
              resolve('false'); // Resuelve la promesa si no existe
          })
          .catch(error => {
              console.error(error);
              reject(error); // Rechaza la promesa en caso de error
          });
    });
  }

  async setFileService(credentials: Img){
    this.name_file = [];
    this.name_file.push(credentials);
    return await this.verificarFirebaseImg();
  }


  saveImg(): Promise<string>{
    const fileRef = ref(this.storage, `${this.name_file[0].name_ruta}`);
    let url = '';
    return uploadBytes(fileRef, this.name_file[0].file)
    .then(
      async res => {
        console.log(res)
        url = await getDownloadURL(fileRef);
        //return this.getFile(url);
        return url;
      })
    .catch(
      error => {
        console.log(error)
        return 'error';
      });
  }

  setimgService(){
    return Promise.resolve(this.saveImg());
  }
}
