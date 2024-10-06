import { Component, OnInit } from '@angular/core';
import { DepartementService } from '../../../services/departements/departement.service';
import { Departement } from '../../../classes/departement';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-listing-departements',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule ],
  templateUrl: './listing-departements.component.html',
  styleUrl: './listing-departements.component.css'
})
export class ListingDepartementsComponent implements OnInit {
  departements: Departement[] = [];
  page:number = 1;

  constructor(private departementService: DepartementService) {}

  ngOnInit(): void {
    this.departementService.getDepartements().subscribe(departements => {
      this.departements = departements;
      console.log(this.departements);
    });
  }
}
