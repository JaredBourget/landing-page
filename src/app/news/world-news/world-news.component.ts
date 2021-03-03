import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-world-news',
  templateUrl: './world-news.component.html',
  styleUrls: ['./world-news.component.scss']
})
export class WorldNewsComponent implements OnInit {

  articles: any = [{'art': 'world1'}, {'art': 'world2'}, {'art': 'world3'},{'art': 'world4'}]

  constructor() { }

  ngOnInit(): void {
  }

}
