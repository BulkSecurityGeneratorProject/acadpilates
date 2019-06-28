import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pessoa',
        loadChildren: './pessoa/pessoa.module#AcadpilatesPessoaModule'
      },
      {
        path: 'contato',
        loadChildren: './contato/contato.module#AcadpilatesContatoModule'
      },
      {
        path: 'endereco',
        loadChildren: './endereco/endereco.module#AcadpilatesEnderecoModule'
      },
      {
        path: 'pais',
        loadChildren: './pais/pais.module#AcadpilatesPaisModule'
      },
      {
        path: 'estado',
        loadChildren: './estado/estado.module#AcadpilatesEstadoModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AcadpilatesEntityModule {}
