import { SerieObject } from './serieObject.model';
export class Historial{
    constructor(
        public name: String,
        public series: SerieObject[],
    ){
        

    }
}