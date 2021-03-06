import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { AppError } from 'app/common/app-error';
import { NotFoundError } from 'app/common/not-found-error';

@Injectable()
export class DataService {

  //url: string;

  constructor(private url: string, private http: Http) { 

  }

  get(){
    return this.http.get(this.url)
        .map(response => response.json());
  }

  create(resource){
    return this.http.post(this.url, JSON.stringify(resource))
  }

  put(resource){
    return this.http.patch(this.url + '/' + resource, 
    JSON.stringify({isRead: true}))
  }

  remove(id: number){
    return this.http.delete(this.url + '/' + id)
      .catch((error: Response)=>{
        if (error.status === 404)
        return Observable.throw(new NotFoundError());
        else
        return Observable.throw(new AppError(error));
      });
  }

}

