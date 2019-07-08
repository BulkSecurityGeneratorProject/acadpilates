/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';
import { IPessoa, Pessoa } from 'app/shared/model/pessoa.model';

describe('Service Tests', () => {
  describe('Pessoa Service', () => {
    let injector: TestBed;
    let service: PessoaService;
    let httpMock: HttpTestingController;
    let elemDefault: IPessoa;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PessoaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Pessoa(0, 'AAAAAAA', 0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, 'image/png', 'AAAAAAA', false, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dataCadastro: currentDate.format(DATE_TIME_FORMAT),
            dataNascimento: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Pessoa', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataCadastro: currentDate.format(DATE_TIME_FORMAT),
            dataNascimento: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataCadastro: currentDate,
            dataNascimento: currentDate
          },
          returnedFromService
        );
        service
          .create(new Pessoa(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Pessoa', async () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            tipo: 1,
            cpfCnpj: 'BBBBBB',
            rgInscEst: 'BBBBBB',
            dataCadastro: currentDate.format(DATE_TIME_FORMAT),
            dataNascimento: currentDate.format(DATE_TIME_FORMAT),
            foto: 'BBBBBB',
            situacao: true,
            categoria: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataCadastro: currentDate,
            dataNascimento: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Pessoa', async () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            tipo: 1,
            cpfCnpj: 'BBBBBB',
            rgInscEst: 'BBBBBB',
            dataCadastro: currentDate.format(DATE_TIME_FORMAT),
            dataNascimento: currentDate.format(DATE_TIME_FORMAT),
            foto: 'BBBBBB',
            situacao: true,
            categoria: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dataCadastro: currentDate,
            dataNascimento: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Pessoa', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
