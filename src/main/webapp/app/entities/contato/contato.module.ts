import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AcadpilatesSharedModule } from 'app/shared';
import {
  ContatoComponent,
  ContatoDetailComponent,
  ContatoUpdateComponent,
  ContatoDeletePopupComponent,
  ContatoDeleteDialogComponent,
  contatoRoute,
  contatoPopupRoute
} from './';

const ENTITY_STATES = [...contatoRoute, ...contatoPopupRoute];

@NgModule({
  imports: [AcadpilatesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ContatoComponent,
    ContatoDetailComponent,
    ContatoUpdateComponent,
    ContatoDeleteDialogComponent,
    ContatoDeletePopupComponent
  ],
  entryComponents: [ContatoComponent, ContatoUpdateComponent, ContatoDeleteDialogComponent, ContatoDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AcadpilatesContatoModule {}
