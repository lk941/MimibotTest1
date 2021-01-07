import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./screens/dashboard/dashboard.component";

import { ButtonsComponent } from "./ui-elements/buttons/buttons.component";
import { TablesComponent } from "./ui-elements/tables/tables.component";
import { TypographyComponent } from "./ui-elements/typography/typography.component";
import { DropdownComponent } from "./ui-elements/dropdown/dropdown.component";

import { Dashboard2Component } from "./screens/dashboard-2/dashboard-2.component";
import { DashboardOverallComponent } from "./screens/dashboard-test/dashboardoverall.component";

import { LoaderComponent } from "./advanced-elements/loader/loader.component";

import { MdiComponent } from "./icons/mdi/mdi.component";

import { FormsComponent } from "./forms/forms.component";

import { ChartjsComponent } from "./charts/chartjs/chartjs.component";

import { LoginComponent } from "./sample-pages/login/login.component";
import { RegisterComponent } from "./sample-pages/register/register.component";
import { Page404Component } from "./sample-pages/page404/page404.component";
import { Page500Component } from "./sample-pages/page500/page500.component";

import { HomeComponent } from './screens/home/home.component';
import { HomeworkComponent } from './screens/homework/homework.component';
import { QuizComponent } from './screens/quiz/quiz.component';
import { BullyReportComponent } from './screens/bully-report/bully-report.component';
import { BullyDetailsComponent} from './screens/bully-details/bully-details.component';
import { ScoreDetailsComponent } from './screens/pcrassesment/score-details/score-details.component';
import { BullyInsightComponent } from './screens/contatos1/bully-insight/bully-insight.component';

import { ParentLoginComponent } from './screens/parent-login/parent-login.component';
import { ParentportalsignComponent } from './screens/parentportalsign/parentportalsign.component';
import { ChildReportComponent } from './screens/child-report/child-report.component';
import { ChildInsightComponent } from './screens/child-insight/child-insight.component';

import { HobbiesComponent } from './screens/hobbies/hobbies.component';
import { HobbiesInsightComponent } from './screens/contatos5/hobbies-insight/hobbies-insight.component';
import { PhqReportComponent } from './screens/phq-report/phq-report.component';
import { PhqComponent } from './screens/phq/phq.component';
import { PpHomeComponent } from './screens/pp-home/pp-home.component';
import { TeachnotifComponent } from './screens/teachnotif/teachnotif.component';
/*
import { PhqInsightComponent } from './screens/contatos6/phq-insight/phq-insight.component';


/* imported from mimibot-nov-20 */
/*

import { ParentLoginComponent } from './screens/parent-login/parent-login.component';
import { ParentportalsignComponent } from './screens/parentportalsign/parentportalsign.component';
import { ChildReportComponent } from './screens/child-report/child-report.component';
import { ChildInsightComponent } from './screens/child-insight/child-insight.component';
import { PpHomeComponent } from './screens/pp-home/pp-home.component';
import { TeachnotifComponent } from './screens/teachnotif/teachnotif.component';
import { HobbiesComponent } from './screens/hobbies/hobbies.component';
import { HobbiesInsightComponent } from './screens/contatos5/hobbies-insight/hobbies-insight.component';
import { PhqReportComponent } from './screens/phq-report/phq-report.component';
import { PhqComponent } from './screens/phq/phq.component';
/*
import { PhqInsightComponent } from './screens/contatos6/phq-insight/phq-insight.component';
import { PointSystemComponent } from './screens/point-system/point-system.component';
import { PointSystemDetailsComponent } from './screens/point-system-details/point-system-details.component';
import { PointSystemTaskComponent } from './screens/point-system-task/point-system-task.component';
import { PointSystemRewardsComponent } from './screens/point-system-rewards/point-system-rewards.component'; */
import { OverallDashComponent } from './screens/dashboard-tableau/dash-overall.component';

import { AuthenticationGuard } from './screens/authentication.guard';

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "forms", component: FormsComponent },
  { path: "buttons", component: ButtonsComponent },
  { path: "tables", component: TablesComponent },
  { path: "mdi", component: MdiComponent },
  { path: "typography", component: TypographyComponent },
  { path: "dropdowns", component: DropdownComponent },
  { path: "loaders", component: LoaderComponent },
  { path: "chartjs", component: ChartjsComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "404-page", component: Page404Component },
  { path: "500-page", component: Page500Component },
  { path: "dashboard2", component: Dashboard2Component},
  { path: "dashboardtest1", component: DashboardOverallComponent},

  { path: 'homework', component: HomeworkComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'bully-report', component: BullyReportComponent},
  { path: 'bully-details/:id', component: BullyDetailsComponent},
  { path: 'PCRAReport', component: ScoreDetailsComponent},
  { path: 'bully-insight', component: BullyInsightComponent},
  //Change component: HomeComponent to path: 'phome'
  { path: 'phome', component: HomeComponent},
  
  { path: 'parentportalsign', component: ParentportalsignComponent},
  { path: 'child-report', component: ChildReportComponent },
  { path: 'child-insight', component: ChildInsightComponent},

  { path: 'hobbies', component: HobbiesComponent},
  { path: 'hobby-insight', component: HobbiesInsightComponent},
  { path: 'phq-report', component: PhqReportComponent},
  { path: 'phq', component: PhqComponent},

  { path: 'child-insight', component: ChildInsightComponent},
  { path: 'phome', component: PpHomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'notifs', component: TeachnotifComponent, canActivate: [AuthenticationGuard] },

  /*
  { path: 'phq-insight', component: PhqInsightComponent},
  { path: 'point-system', component: PointSystemComponent},
  { path: 'point-system-task', component: PointSystemTaskComponent},
  { path: 'point-system-rewards', component: PointSystemRewardsComponent},
  { path: 'point-system-details/:id', component: PointSystemDetailsComponent},
  /*
  { path: 'phq-insight', component: PhqInsightComponent},

  // imported from mimibot-nov-20
  //Change '' to ParentLoginComponent
  // { path: '', component: ParentLoginComponent },
  /*
  //Change component: HomeComponent to path: 'phome'
  { path: 'phome', component: HomeComponent},
  { path: 'parentportalsign', component: ParentportalsignComponent},
  { path: 'child-report', component: ChildReportComponent },
  { path: 'child-insight', component: ChildInsightComponent},
  { path: 'phome', component: PpHomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'notifs', component: TeachnotifComponent, canActivate: [AuthenticationGuard] },
  { path: 'hobbies', component: HobbiesComponent},
  { path: 'hobby-insight', component: HobbiesInsightComponent},
  { path: 'phq-report', component: PhqReportComponent},
  { path: 'phq', component: PhqComponent},
  /*
  { path: 'phq-insight', component: PhqInsightComponent},
  { path: 'point-system', component: PointSystemComponent},
  { path: 'point-system-task', component: PointSystemTaskComponent},
  { path: 'point-system-rewards', component: PointSystemRewardsComponent},
  { path: 'point-system-details/:id', component: PointSystemDetailsComponent}, */
  { path: 'dash-tableau', component: OverallDashComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthenticationGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
