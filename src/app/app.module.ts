import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { Http ,HttpModule} from '@angular/http';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartsModule } from "ng2-charts";
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgxGaugeModule } from "ngx-gauge";

import { AppComponent } from "./app.component";

import { FooterComponent } from "./partials/footer/footer.component";
import { NavbarComponent } from "./partials/navbar/navbar.component";
import { SidebarComponent } from "./partials/sidebar/sidebar.component";

import { ButtonsComponent } from "./ui-elements/buttons/buttons.component";
import { DropdownComponent } from "./ui-elements/dropdown/dropdown.component";
import { TablesComponent } from "./ui-elements/tables/tables.component";
import { TypographyComponent } from "./ui-elements/typography/typography.component";

import { DashboardComponent } from "./screens/dashboard/dashboard.component";


import { FormsComponent } from "./forms/forms.component";

import { MdiComponent } from "./icons/mdi/mdi.component";

import { LoaderComponent } from "./advanced-elements/loader/loader.component";

import { ChartjsComponent } from "./charts/chartjs/chartjs.component";

import { LoginComponent } from "./sample-pages/login/login.component";
import { RegisterComponent } from "./sample-pages/register/register.component";
import { Page404Component } from "./sample-pages/page404/page404.component";
import { Page500Component } from "./sample-pages/page500/page500.component";
import { Dashboard2Component } from "./screens/dashboard-2/dashboard-2.component";
import { DashboardOverallComponent } from "./screens/dashboard-test/dashboardoverall.component";

// imports from mimibot-nov-2020

import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import { ContatoDataService } from './screens/contatos/shared/contato-data.service';
import { ContatoService } from './screens/contatos/shared/contato.service';
import { AutomlService } from './screens/contatos1/bully-insight/automl.service';
import { AuthService } from './screens/auth.service';
import { ExcelService } from './screens/child-model/excel-service/excel.service';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { MatTableModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatPaginatorModule, MatDialog, MatDialogModule, MatSortModule, MatBadgeModule, MatIconModule, MatButtonModule } from '@angular/material';
import { EditComponent } from './screens/contatos/edit/edit.component';
import { ListComponent } from './screens/contatos/list/list.component';

import { ConfirmationDialogComponent } from './screens/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './screens/confirmation-dialog/confirmation-dialog.service';
import { OverallDashComponent } from "./screens/dashboard-tableau/dash-overall.component";
import { NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { OAuthModule } from 'angular-oauth2-oidc';
import { UniquePipe } from './screens/pcrassesment/unique.pipe';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavComponent } from './screens/nav/nav.component';
import { HomeComponent } from './screens/home/home.component';
import { HomeworkComponent } from './screens/homework/homework.component';
import { QuizComponent } from './screens/quiz/quiz.component';
import { BullyReportComponent } from './screens/bully-report/bully-report.component';
import { BullyDetailsComponent } from './screens/bully-details/bully-details.component';
import { BullyInsightComponent } from './screens/contatos1/bully-insight/bully-insight.component';
import { Edit1Component } from './screens/contatos1/edit1/edit1.component';
import { List1Component } from './screens/contatos1/list1/list1.component';
import { Edit2Component } from './screens/contatos2/edit2/edit2.component';
import { List2Component } from './screens/contatos2/list2/list2.component';
import { Edit3Component } from './screens/contatos3/edit3/edit3.component';
import { List3Component } from './screens/contatos3/list3/list3.component';
import { ScoreDetailsComponent } from './screens/pcrassesment/score-details/score-details.component';
import { TagCloudComponent } from './screens/tag-cloud/tag-cloud.component';

import{ jqxTagCloudComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtagcloud';  
import { jqxColorPickerComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcolorpicker';
import { jqxDropDownButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownbutton';

import { ParentPortalComponent } from './screens/parent-portal/parent-portal.component';
import { ParentLoginComponent } from './screens/parent-login/parent-login.component';
import { ParentportalsignComponent } from './screens/parentportalsign/parentportalsign.component';
import { ChildReportComponent } from './screens/child-report/child-report.component';
import { ChildInsightComponent } from './screens/child-insight/child-insight.component';
import { List4Component } from './screens/contatos4/list4/list4.component';


/*


import { SelectChildPageComponent } from './screens/select-child-page/select-child-page.component';
import { PpHomeComponent } from './screens/pp-home/pp-home.component';
import { TeachAddChildComponent } from './screens/teach-add-child/teach-add-child.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogboxComponent } from './screens/Dialogbox/dialogbox/dialogbox.component';
import { TeachParConfirmationComponent } from './screens/confirmation/teach-par-confirmation/teach-par-confirmation.component';
import { TeachnotifComponent } from './screens/teachnotif/teachnotif.component';

import { HobbiesComponent } from './screens/hobbies/hobbies.component';
import { Edit5Component } from './screens/contatos5/edit5/edit5.component';
import { List5Component } from './screens/contatos5/list5/list5.component';
import { HobbiesInsightComponent } from './screens/contatos5/hobbies-insight/hobbies-insight.component';
import { PhqReportComponent } from './screens/phq-report/phq-report.component';
/*

import { Edit9Component } from './screens/contatos9/edit9/edit9.component';
import { List9Component } from './screens/contatos9/list9/list9.component';
import { Edit7Component } from './screens/contatos7/edit7/edit7.component';
import { List7Component } from './screens/contatos7/list7/list7.component';
import { Edit8Component } from './screens/contatos8/edit8/edit8.component';
import { List8Component } from './screens/contatos8/list8/list8.component';
import { PointSystemComponent } from './screens/point-system/point-system.component';
import { PointSystemDetailsComponent } from './screens/point-system-details/point-system-details.component';
import { PointSystemTaskComponent } from './screens/point-system-task/point-system-task.component';
import { PointSystemRewardsComponent } from './screens/point-system-rewards/point-system-rewards.component';
import { PhqComponent } from './screens/phq/phq.component';
import { PhqInsightComponent } from './screens/contatos6/phq-insight/phq-insight.component';
import { Edit6Component } from './screens/contatos6/edit6/edit6.component';
import { List6Component } from './screens/contatos6/list6/list6.component';
import { Edit10Component } from './screens/contatos10/edit10/edit10.component';
import { List10Component } from './screens/contatos10/list10/list10.component'; */



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    Dashboard2Component,
    DashboardOverallComponent,
    FormsComponent,
    ButtonsComponent,
    TablesComponent,
    TypographyComponent,
    DropdownComponent,
    LoaderComponent,
    ChartjsComponent,
    MdiComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    // imports from mimibot-nov-20
    EditComponent,
    ListComponent,
    ConfirmationDialogComponent,
    UniquePipe,
    NavComponent,
    HomeComponent,
    HomeworkComponent,
    QuizComponent,
    BullyReportComponent,
    BullyDetailsComponent,
    BullyInsightComponent,
    Edit1Component,
    List1Component,
    Edit2Component,
    List2Component,
    Edit3Component,
    List3Component,
    ScoreDetailsComponent,
    ConfirmationDialogComponent,
    TagCloudComponent,
    jqxTagCloudComponent,
    jqxColorPickerComponent,
    jqxDropDownButtonComponent,
    ParentPortalComponent,
    ParentLoginComponent,
    ParentportalsignComponent,
    ChildReportComponent,
    ChildInsightComponent,
    List4Component,


    /*
    
  
    SelectChildPageComponent,
    PpHomeComponent,
    TeachAddChildComponent,
    DialogboxComponent,
    TeachParConfirmationComponent,
    TeachnotifComponent,
    HobbiesComponent,
    Edit5Component,
    List5Component,
    HobbiesInsightComponent,
    PhqReportComponent,
    /*
    PhqReportComponent,
    Edit9Component,
    List9Component,
    Edit7Component,
    List7Component,
    Edit8Component,
    List8Component,
    PointSystemComponent,
    PointSystemDetailsComponent,
    PointSystemTaskComponent,
    PointSystemRewardsComponent,
    PhqComponent,
    PhqInsightComponent,
    Edit6Component,
    List6Component,
    Edit10Component,
    List10Component, */
    OverallDashComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    NgxGaugeModule,
    NgbModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      outerStrokeWidth: 10,
      innerStrokeWidth: 5,
      showBackground: false,
      startFromZero: false
    }),
    // from mimibot
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule, 
    NgbModule,
    /*
    OAuthModule.forRoot(), */
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    //BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule, 
    MatBadgeModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [ ContatoService,ContatoDataService, ConfirmationDialogService, AutomlService, AuthService, ExcelService, MatDialog, OverallDashComponent],
  bootstrap: [AppComponent],
  exports: [MatSortModule]
})
export class AppModule {}
