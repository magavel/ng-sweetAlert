import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { keys } from 'my-keys';
import {Movie} from '../models/movie';
import {subscribeOn} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  favoriteTvShow;
  message;
  URL = 'https://api.themoviedb.org/3';
  imgURL = 'https://image.tmdb.org/t/p/w500';
  imgSrc = '';
  results;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  getMovie(movieName: Text) {
    this.http
     .get<Movie>(`${this.URL}/search/movie?api_key=${keys.theMovieDatabase}&query=${movieName}` )
     .subscribe((data) => {
       console.log(data);
       this.results = data.results;
     }, (err) => {
       console.log('erreur', err);
     });
    // this.favoriteTvShow =  this.http.get<Movie>(`${this.URL}query=${movieName}&language=fr`, {headers});
  }
  saveTvShow(e): void {
    console.log('saveTvShow e', e);
    this.getMovie(e);
  }
  cancelTvShow(e): void {
    switch (e) {
      case 'esc':
          this.message = ' vous avez cliqué sur esc';
          this.hide(1500);
          break;
        case 'backdrop':
          this.message = ' vous avez cliqué sur backdrop';
          this.hide(1500);
        break;
    }
    console.log('cancelTvShow e', e);
  }

  hide(ms) {
    setTimeout(() => this.message = '', ms);
  }

}
