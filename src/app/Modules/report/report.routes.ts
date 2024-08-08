import { Routes } from "@angular/router";
import { MainReportComponent } from "./main-report/main-report.component";
import { ViewReportComponent } from "./view-report/view-report.component";
import { IncomeComponent } from "./income/income.component";
import { ExpenditureComponent } from "./expenditure/expenditure.component";
import { DicrepancyComponent } from "./dicrepancy/dicrepancy.component";
import { PrintComponent } from "./print/print.component";

export const reportRoute: Routes = [
    {path: 'reportmain', component: MainReportComponent,
        children: [
            {path: 'reportview', component:ViewReportComponent,
                children: [
                    {path: 'income', component: IncomeComponent},
                    {path: 'expenditure', component: ExpenditureComponent},
                    {path: 'disrepancy', component: DicrepancyComponent},
                    // {path: 'print', component: PrintComponent},
                    {path: '', redirectTo: 'income', pathMatch: 'full'}
                ]
            },
            {path: '', redirectTo: 'reportview', pathMatch: 'full'}
        ]},
    {path: 'print', component: PrintComponent},
    {path: '', redirectTo: 'reportmain', pathMatch:'full'}
];