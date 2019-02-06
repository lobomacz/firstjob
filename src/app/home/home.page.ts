import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AdminService } from './../services/admin.service';
import { Spot } from './../clases/spot';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	public spot1:Spot;
	public spot2:Spot;
	public spot3:Spot;
	public baseUrl:string = environment.appUrl;

	constructor(private aService:AdminService){} 

	ngOnInit(){
		this.spot1 = new Spot();
		this.spot2 = new Spot();
		this.spot3 = new Spot();
		this.LlenaSpots();
	}

	LlenaSpots(){
    this.aService.GetSpot('1').subscribe((res) => {
      if (res.ok && res.json() != null) {
        this.spot1 = new Spot(res.json());
      }
    });

    this.aService.GetSpot('2').subscribe((res) => {
      if (res.ok && res.json() != null) {
        this.spot2 = new Spot(res.json());
      }
    });

    this.aService.GetSpot('3').subscribe((res) => {
      if (res.ok && res.json() != null) {
        this.spot3 = new Spot(res.json());
      }
    });
  }
}
