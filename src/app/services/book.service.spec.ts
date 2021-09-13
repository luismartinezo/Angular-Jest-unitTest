import { BookService } from './book.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';
import swal from 'sweetalert2';


const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 15,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 20,
        amount: 1
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 8,
        amount: 7
    }
];


describe('BookService', () => {

    let service: BookService;
    let httpMock : HttpTestingController;

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach( ()=> {
        // Instancia los servicios y un mocks
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    // Despues del test verifica que no hallan peticiones pendientes entre cada test 
    afterEach( () => {
        localStorage.clear();
        jest.resetAllMocks();
    });

    afterAll( () => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('getBooks return a list of book and does a get method', () => {
        service.getBooks().subscribe((resp: Book[]) => {
            // Esperamos que el array que recibamos sea igual a la que tenemos creada arriba 
            expect(resp).toEqual(listBook);
        });

        const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
        // Se espera que la peticion sea tipo GET 
        expect(req.request.method).toBe('GET');
        req.flush(listBook);
    });

    // tEST QUE VALIDA QUE CUANDO EL LOCAL_STORAGE ESTE VACIO RETORNE UN ARRAY VACIO
    it('getBooksFromCart return an empty array when localStorage is empty', () => {
        const listBook = service.getBooksFromCart();
        expect(listBook.length).toBe(0);
    });
    // TEST QUE DEVUELVE UN ARRAY DE LIBRSO CUANDO HALLA EN EL LOCAL_STORAGE
    it('getBooksFromCart return an array of books when it exists in the localStorage', () => {
        localStorage.setItem('listCartBook', JSON.stringify(listBook));
        const newListBook = service.getBooksFromCart(); 
        expect(newListBook.length).toBe(3);
    });
    // TEST QUE PERMITE AGREGAR UN LIBRO CORRECTAMENTE CUANDO EL LIBRO NO ESTE EL LOCAL_STORAGE
    it('addBookToCart add a book successfully when the list does not exits in the localStorage', () => {
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15
        };
        const toastMock = {
            fire: () => null
        } as any;
        const spy1 = jest.spyOn(swal, 'mixin').mockImplementation( () => {
            return toastMock;
        });
        let newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(0);
        service.addBookToCart(book);
        newListBook = service.getBooksFromCart();
        expect(newListBook.length).toBe(1);
        expect(spy1).toHaveBeenCalledTimes(1);
    });

    // public removeBooksFromCart(): void {
    //     localStorage.setItem('listCartBook', null);
    //   }

    // TEST QUE VALIDA SI ELIMINA LA LISTA EN EL LOCAL_STORAGE
    it('removeBooksFromCart removes the list fron the localStorage', () => {
        const toastMock = {
            fire: () => null
        } as any;
        jest.spyOn(swal, 'mixin').mockImplementation( () => {
            return toastMock;
        });
        const book: Book = {
            name: '',
            author: '',
            isbn: '',
            price: 15
        };
        service.addBookToCart(book);
        let newListBook = service.getBooksFromCart();
        // Verifica que halla un libro
        expect(newListBook.length).toBe(1);
        // Envia el service para eliminar
        service.removeBooksFromCart();
        // Volvemos a actualizar la lista de libro
        newListBook = service.getBooksFromCart();
        // Verificamos que sea cer0
        expect(newListBook.length).toBe(0);
    });


});