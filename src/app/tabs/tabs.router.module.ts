import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'tab1', children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      //tabs contactos
      {
        path: 'historial',
        children: [
          {
            path: '',
            loadChildren: '../historial/historial.module#HistorialPageModule'
          },
          //para los contactos 
          //{path: 'pagarenviocobro/:id/:nombre', loadChildren: '../pagarenviocobro/pagarenviocobro.module#PagarenviocobroPageModule' },
          { path: 'transferencias', loadChildren: '../transferencias/transferencias.module#TransferenciasPageModule' }
        ]
      },
      //tab home
      {
        path: 'tab2',
        children: [
          { path: '',loadChildren: '../tab2/tab2.module#Tab2PageModule'},
          //carga y retiro de saldo
          { path: 'ingresoegreso', loadChildren: '../ingresoegreso/ingresoegreso.module#IngresoegresoPageModule' },
          { path: 'cargarsaldo/:id', loadChildren: '../cargarsaldo/cargarsaldo.module#CargarsaldoPageModule' },
          { path: 'cargacontarjeta/:id', loadChildren: '../cargacontarjeta/cargacontarjeta.module#CargacontarjetaPageModule' },
          { path: 'confirmacargasaldo/:id', loadChildren: '../confirmacargasaldo/confirmacargasaldo.module#ConfirmacargasaldoPageModule' },
          { path: 'retirarsaldo/:id', loadChildren: '../retirarsaldo/retirarsaldo.module#RetirarsaldoPageModule' },
          { path: 'confirmaretirosaldo/:id', loadChildren: '../confirmaretirosaldo/confirmaretirosaldo.module#ConfirmaretirosaldoPageModule' },
          { path: 'retirarconcuenta/:id', loadChildren: '../retirarconcuenta/retirarconcuenta.module#RetirarconcuentaPageModule' },
          //generar qr
          { path: 'recibedinero', loadChildren: '../recibedinero/recibedinero.module#RecibedineroPageModule' },
          { path: 'cobroqr', loadChildren: '../cobroqr/cobroqr.module#CobroqrPageModule' },
          //pagos personalmente
          { path: 'cards/:phoneNumber', loadChildren: '../cards/cards.module#CardsPageModule' },
          { path: 'escaner/:monto/:phoneNumber', loadChildren: '../escaner/escaner.module#EscanerPageModule' },
        ]
      }, {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: '../tab4/tab4.module#Tab4PageModule'
          }
        ]
      },
      //tab perfil
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          },
        { path: 'modpin', loadChildren: '../modpin/modpin.module#ModpinPageModule' }
        ]
      },

      {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
