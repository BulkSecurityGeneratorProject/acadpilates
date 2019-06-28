import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AcadpilatesSharedModule } from 'app/shared';
import {
  PessoaComponent,
  PessoaDetailComponent,
  PessoaUpdateComponent,
  PessoaDeletePopupComponent,
  PessoaDeleteDialogComponent,
  pessoaRoute,
  pessoaPopupRoute
} from './';

const ENTITY_STATES = [...pessoaRoute, ...pessoaPopupRoute];

@NgModule({
  imports: [AcadpilatesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PessoaComponent, PessoaDetailComponent, PessoaUpdateComponent, PessoaDeleteDialogComponent, PessoaDeletePopupComponent],
  entryComponents: [PessoaComponent, PessoaUpdateComponent, PessoaDeleteDialogComponent, PessoaDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AcadpilatesPessoaModule {}
