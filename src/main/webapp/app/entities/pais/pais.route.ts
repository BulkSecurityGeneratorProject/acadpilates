import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Pais } from 'app/shared/model/pais.model';
import { PaisService } from './pais.service';
import { PaisComponent } from './pais.component';
import { PaisDetailComponent } from './pais-detail.component';
import { PaisUpdateComponent } from './pais-update.component';
import { PaisDeletePopupComponent } from './pais-delete-dialog.component';
import { IPais } from 'app/shared/model/pais.model';

@Injectable({ providedIn: 'root' })
export class PaisResolve implements Resolve<IPais> {
  constructor(private service: PaisService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPais> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Pais>) => response.ok),
        map((pais: HttpResponse<Pais>) => pais.body)
      );
    }
    return of(new Pais());
  }
}

export const paisRoute: Routes = [
  {
    path: '',
    component: PaisComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Pais'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PaisDetailComponent,
    resolve: {
      pais: PaisResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pais'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PaisUpdateComponent,
    resolve: {
      pais: PaisResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pais'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PaisUpdateComponent,
    resolve: {
      pais: PaisResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pais'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const paisPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PaisDeletePopupComponent,
    resolve: {
      pais: PaisResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Pais'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
