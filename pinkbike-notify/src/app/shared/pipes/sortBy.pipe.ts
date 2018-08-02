import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'reverse'})
export class ReversePipe implements PipeTransform {
  transform(array: Array<any>): Array<any> {
    // let newArray = array.sort((a,b) => {
    //     var x = a[key]; var y = b[key];

    //     let out = ((x < y) ? -1 : ((x > y) ? 1 : 0));
        
    //     if(reverse && out != 0) out * -1;

    //     return out;
    // });

    return array.reverse();
  }
}
