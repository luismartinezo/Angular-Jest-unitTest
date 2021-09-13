import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

import { take } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public listBook: Book[] = [];

  constructor(
    public readonly bookService: BookService
  ) { }

  ngOnInit(): void {

    this.getBooks();

  }

  public getBooks(): void {
    // Devuelve un observable que dentro tiene una lista de libros 
    this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
      this.listBook = resp;
    });
  }

}
