import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { Book } from '../../models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

// Utilizamos este arreglo para validar price y amount para el metodo getTotalPrice
const listBook: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    price: 15,
    amount: 2,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 20,
    amount: 1,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 8,
    amount: 7,
  },
];

const MatDialogMock = {
  open() {
      return {
        // devuelve un observable en true 
          afterClosed: () => of(true)
      };
  }
};

describe('Cart component', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: BookService;
  // Se ejecuta antes del test porque es la configuracion
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Importaciones de modulos
      imports: [
        // Este modulo sirve para no hacer una peticion real porque es TestinModule
        HttpClientTestingModule,
      ],
      declarations: [
        // Nombre del componente a probar
        CartComponent,
      ],
      providers: [
        // Nombre se Service relacionado
        BookService,
        { provide: MatDialog, useValue: MatDialogMock },
      ],
    //   Se añaden estas dos constantes y se recomiendan mucho para los test
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => { 
    fixture = TestBed.createComponent(CartComponent);
    //   Instanciamos el componente
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(BookService);
    // Espia para el metodo que devuelve el listado de libros 
    jest.spyOn(service, 'getBooksFromCart').mockImplementation(() => listBook);
  });

  afterEach(() => {
      // Resetea t destruye
    fixture.destroy();
    jest.resetAllMocks();
  });

//   Test: tiene el nombre llamado should create 
  it('should create', () => {
    //   Aca decimos que el componente se ha instanciado correctamente, 
    // dentro de un test debe tener algo para validar, 
    // de lo contrario el test va a pasar normal 
    expect(component).toBeTruthy();
  });

  // Instanciamos un componente
  // it('should create', inject([CartComponent], (component2: CartComponent) => {
  //     expect(component2).toBeTruthy();
  // }));

  // Test con return  
  it('getTotalPrice returns an amaunt', () => {
    const totalPrice = component.getTotalPrice(listBook);
    // Le decimos que reciba un valor mayor a cer0
    expect(totalPrice).toBeGreaterThan(0);
    // Que no este en cer0
    // expect(totalPrice).not.toBe(0);
    // Que no sea nulo
    // expect(totalPrice).not.toBeNull();
  });

  // Test sin return
  it('onInputNumberChange increments correctly', () => {
    //   Esta es la accion plus(+)
    const action = 'plus';
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2,
    };
    // Creamos espias para llamar los metodo updateAmountBook del service pero no puede llamar el servicio,
    // se devuelve un nulo 
    const spy1 = jest.spyOn(service, 'updateAmountBook')
      .mockImplementation(() => null);
// Creamos un segundo espia para el metodo getTotalPrice del componente 
    const spy2 = jest.spyOn(component, 'getTotalPrice')
      .mockImplementation(() => null);
    //   esperamos un valor de 2 para el libro 
    expect(book.amount).toBe(2);
    // Aca llamamos los metodos
    component.onInputNumberChange(action, book);
    expect(book.amount).toBe(3);
    // Las veces que se ha llamado
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

//   Test sin return para la accion minus(-)
  it('onInputNumberChange decrements correctly', () => {
    const action = 'minus';
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2,
    };

    const spy1 = jest
      .spyOn(service, 'updateAmountBook')
      .mockImplementation(() => null);
    const spy2 = jest
      .spyOn(component, 'getTotalPrice')
      .mockImplementation(() => null);
    expect(book.amount).toBe(2);
    component.onInputNumberChange(action, book);
    expect(book.amount).toBe(1);

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

   //  test metodos privados, Limpiado de libros en el carrito trabaja correctly
  it('onClearBooks works correctly', () => {
      // Espiamos el metodo removeBooksFromCart del service
    const spy1 = jest.spyOn(service, 'removeBooksFromCart')
      .mockImplementation(() => null);
    // Espiamos el metodo _clearListCartBook del component, 
    // para espiar un metodo privado se debe colocar como as any
    // y no es necesario un mock   
    const spy2 = jest.spyOn(component as any, '_clearListCartBook');
    component.listCartBook = listBook;
    component.onClearBooks();
    // Aca le decimo que debe ser cer0 porque se limpia la lista
    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

//   Limpiado de la lista de libros en el carrito trabaja correctly
  it('_clearListCartBook works correctly', () => {
    const spy1 = jest
      .spyOn(service, 'removeBooksFromCart')
      .mockImplementation(() => null);
    component.listCartBook = listBook;
    component['_clearListCartBook']();
    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalledTimes(1);
  });

  
  it('The title "The cart is empty" is not displayed when there is a list', () => {
    component.listCartBook = listBook;
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(
      By.css('#titleCartEmpty')
    );
    expect(debugElement).toBeFalsy();
  });

  it('The title "The cart is empty" is displayed correctly when the list is empty', () => {
    component.listCartBook = [];
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(
      By.css('#titleCartEmpty')
    );
    expect(debugElement).toBeTruthy();
    if (debugElement) {
      const element: HTMLElement = debugElement.nativeElement;
      expect(element.innerHTML).toContain('The cart is empty');
    }
  });
});
