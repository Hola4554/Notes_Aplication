export interface Note {
  _id?:string;
  title:string;
  content:string;
  color: string;
  list:string;
  editable?:boolean;
  originalContent?:string;
  originalTitle?:string;
}
