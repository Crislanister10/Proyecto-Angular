import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  public design : string;
  
  constructor ( ){
    this.design = "Design"
  }

  ngOnInit(): void {
    
  }
}
