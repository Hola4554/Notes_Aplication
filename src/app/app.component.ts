import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notesFirebaseProyect';

  public horizontalPoints: number[] = [];
  public verticalPoints: number[] = [];
  public spacing = 20;

  public showDialogNewNote = false;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    // Aquí puedes llamar a tu función
    this.setDotsOnScreen();
  }

  setDotsOnScreen(){
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (let i = 0; i <= screenWidth; i += this.spacing) {
      this.horizontalPoints.push(i);
    }

    for (let i = 0; i <= screenHeight; i += this.spacing) {
      this.verticalPoints.push(i);
    }
  }

  ngOnInit(): void {
    this.setDotsOnScreen();
  }

  addNote(){
    this.showDialogNewNote = true;
  }
}
