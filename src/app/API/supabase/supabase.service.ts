import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { v4 as uuidv4 } from 'uuid';
import { createClient, SupabaseClient } from '@supabase/supabase-js';



@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseConfig.url, environment.supabaseConfig.apikey)
   }

   

  async addImageProductSupabase(image: File){
     
    const id = this.generateId()
    const imageUrl = await this.uploadFileToSupabase(environment.supabaseBucket.Products.images, id, image)
    return imageUrl
  }



  private async uploadFileToSupabase(folder: string, id: string, image: File){
      const {error} = await this.supabase.storage
      .from(environment.supabaseBucket.Products.name)
      .upload(`${folder}/${id}/${image.name}`, image)

      if(error){
        throw new Error(`Error subiendo archivo: ${error.message}`)
      }
    const { data: fileUrl } = this.supabase.storage
    .from(environment.supabaseBucket.Products.name)
    .getPublicUrl(`${folder}/${id}/${image.name}`);

    return fileUrl.publicUrl
  }



  private generateId(): string {
    return uuidv4();
  }
}
