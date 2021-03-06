import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HistorialVentasComponent } from './pages/historial-ventas/historial-ventas.component';
import { MarkdownspageComponent } from './pages/markdownspage/markdownspage.component';
import { GlobalsalesComponent } from './pages/globalsales/globalsales.component';


const app_routes: Routes =[
    {path:'dashboard', component:DashboardComponent},
    {path:'historial', component:HistorialVentasComponent},
    {path:'markdowns', component:MarkdownspageComponent},
    {path:'globalsales', component:GlobalsalesComponent},
    {path:'', pathMatch:'full', redirectTo:'dashboard'},
    {path:'**', pathMatch:'full', redirectTo:'dashboard'}
];

export const app_routing = RouterModule.forRoot(app_routes,{useHash: true});