import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { VietnamService } from 'src/app/services/vietnam.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  provinces: any[] = [];
  selectedProvinceId!: string;
  districts: any[] = [];
  selectedDistrictId!: string;
  wards: any[] = [];

  constructor(private vietnamService: VietnamService) {}

  ngOnInit(): void {
    this.getProvinces();
  }

  getProvinces() {
    this.vietnamService.getProvinces().subscribe(
      (response) => {
        this.provinces = response.results;
      },
      (error) => {
        console.error('Error fetching provinces:', error);
      }
    );
  }

  getProvinceSelected(event: any): void {
    this.selectedProvinceId = event.target.value;
    this.getDistricts();
  }

  getDistricts() {
    this.vietnamService.getDistricts(this.selectedProvinceId).subscribe(
      (response) => {
        this.districts = response.results;
      },
      (error) => {
        console.error('Error fetching provinces:', error);
      }
    );
  }

  getDistrictSelected(event: any): void {
    this.selectedDistrictId = event.target.value;
    this.getWards();
  }

  getWards() {
    this.vietnamService.getWards(this.selectedDistrictId).subscribe(
      (response) => {
        this.wards = response.results;
      },
      (error) => {
        console.error('Error fetching provinces:', error);
      }
    );
  }
}
