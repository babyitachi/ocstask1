import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ForkDialogData } from 'src/app/models/ForkDialogData.model';
import { OrgProduct } from 'src/app/models/orgProduct.model';
import { RepositoriesService } from 'src/app/services/repositories.service';

@Component({
  selector: 'app-fork-dialog',
  templateUrl: './fork-dialog.component.html',
  styleUrls: ['./fork-dialog.component.scss']
})
export class ForkDialogComponent implements OnInit {
  public forks: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: ForkDialogData,
    private repositoriesService: RepositoriesService) { // injecting services
    this.forks = [];
    this.fetchForks(); // initial call
  }

  ngOnInit() { }

  public fetchForks() { // function for getting all the forks and selecting top 5 for display
    try {
      let orgProduct = new OrgProduct();
      orgProduct.organization = this.data.organization;
      orgProduct.product = this.data.product;
      this.repositoriesService.getForks(orgProduct).subscribe(forks => {
        if (forks && forks.length > 0) {
          this.forks = forks.slice(0,this.data.m); // selecting top m forks to view
        } else {
          this.forks = [];
        }
      }, error => {
        console.log(error); // console lof error if any
      });
    } catch (ex) {
      console.log(ex); // console lof error if any
    }
  }

}
