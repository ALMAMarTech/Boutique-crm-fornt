import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() {
  }

  public validate($event: any) {
    this.processValidation($event.target);
  }

  private processValidation(target: any): boolean{
    let value = target.value;
    console.log('value', value);
    target.classList.remove('input-fail');
    if (target.classList.contains('not-empty')) {
      if(value == null || value == 0 || value == ""){
        target.classList.add('input-fail');
        return false;
      }
    }

    if(target.classList.contains('min-than')) {
      let compareId = target.dataset.min;
      if(compareId){
        // @ts-ignore
        let compareValue = document.getElementById(compareId).value;
        console.log('compareValue', compareValue);
        if(compareValue != null && compareValue != ""){
          if(value != null && value != ""){
            if(parseFloat(value) >= parseFloat(compareValue)){
              target.classList.add('input-fail');
              return false;
            }
          }
        }
      }
    }

    if(target.classList.contains('max-than')) {
      let compareId = target.dataset.max;
      if(compareId){
        // @ts-ignore
        let compareValue = document.getElementById(compareId).value;
        console.log('compareValue', compareValue);
        if(compareValue != null && compareValue != ""){
          if(value != null && value != ""){
            if(parseFloat(value) <= parseFloat(compareValue)){
              console.log("entre");
              target.classList.add('input-fail');
              return false;
            }
          }
        }
      }
    }

    if(target.classList.contains('not-negative')){
      if(value != null && value != ""){
        if(parseFloat(value) <= 0){
          target.classList.add('input-fail');
          return false;
        }
      }
    }

    if(target.classList.contains('equals-to')) {
      let compareId = target.dataset.target;
      if(compareId){
        // @ts-ignore
        let compareValue = document.getElementById(compareId).value;
        console.log('compareValue', compareValue);
        if(compareValue != null && compareValue != ""){
          if(value != null && value != ""){
            if(value != compareValue){
              target.classList.add('input-fail');
              return false;
            }
          }
        }
      }
    }

    return true;
  }

  public isValidFormByClass(className: string): boolean {
    let elements = document.getElementsByClassName(className);
    let fails = 0;
    for(let i = 0; i<elements.length; i++){
      if(!this.processValidation(elements.item(i))){
        fails++;
      }
    }
    return fails == 0;
  }
}
