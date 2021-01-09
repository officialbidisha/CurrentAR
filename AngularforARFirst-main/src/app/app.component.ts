import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  storedTheme: string = localStorage.getItem('theme-color');
  constructor() { }
  
  ngOnInit() {
  }
  setTheme(theme){
    localStorage.setItem('theme-color',theme);
    this.storedTheme= localStorage.getItem('theme-color');
  }
}
