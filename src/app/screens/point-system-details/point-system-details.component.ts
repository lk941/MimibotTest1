import { Contato7 } from 'src/app/contatos7/shared/contato7';
import { Component, OnInit } from '@angular/core';
import { ContatoService } from 'src/app/contatos7/shared/contato7.service';
import { Observable } from 'rxjs';
import { ContatoDataService } from 'src/app/contatos7/shared/contato7-data.service';
import { Router, Params } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {NavService} from 'src/app/screens/nav/nav.service'

@Component({
  selector: 'app-point-system-details',
  templateUrl: './point-system-details.component.html',
  styleUrls: ['./point-system-details.component.scss']
})
export class PointSystemDetailsComponent implements OnInit {

  constructor(
		private contatoService: ContatoService, 
        private contatoDataService: ContatoDataService, 
        private router: Router, 
        private route: ActivatedRoute,
        private nav: NavService) { }

	contatos7: Observable<any>;
    TaskId: string;
    PointsDetails: any;
	

  ngOnInit() {
	  // this.nav.hide()
        this.route.params.forEach((urlParameters) => {
            this.TaskId = urlParameters['id'];
          });
        this.PointsDetails = this.contatoService.getPointsById(this.TaskId);
        console.log(JSON.stringify(this.PointsDetails))
		
		// this.Pie();
  }
  
  		//pt pie graph
    // Pie(){
        // var AvaPoints = this.count(this.Available)


		// console.log(AvaPoints[0])

		
        // console.log(this.colorSet(this.Available))

		
        // this.PieChart = new Chart('pieChart', {
            // type: 'pie',
            // data: {
                // labels: this.Available,
                // datasets: [{
                    // data: AvaPoints[0],
                    // backgroundColor: this.colorSet(this.Available),
                    // borderColor: 'black',
                    // borderWidth: 0.3
                // }]
            // },options: {
                // responsive: true,
                // title:{
                    // text: "Still trying on pie charts when select user",
                    // display: true,
                    // fontSize: 15
                // },legend: {
                    // position: 'bottom',
                    // labels: {
                        // fontSize: 15
                    // }
                // }
            // }
        // })
    // }

}
