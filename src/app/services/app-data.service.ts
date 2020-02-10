import { Injectable } from '@angular/core';
import dataSet from './jsonData.json';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  dataSet = {}
  constructor() { 
    this.dataSet = this.getProfiles(); 
  }

  getProfiles(){
    return dataSet
  }
}
