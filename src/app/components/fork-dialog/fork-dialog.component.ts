import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { OrgProduct } from 'src/app/models/orgProduct.model';
import { RepositoriesService } from 'src/app/services/repositories.service';

@Component({
  selector: 'app-fork-dialog',
  templateUrl: './fork-dialog.component.html',
  styleUrls: ['./fork-dialog.component.scss']
})
export class ForkDialogComponent implements OnInit {
  public forks: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: OrgProduct,
    private repositoriesService: RepositoriesService) {
    this.forks = [];
    this.fetchForks();
  }

  ngOnInit() { }

  public fetchForks() {
    try {
      let orgProduct = new OrgProduct();
      orgProduct.organization = this.data.organization;
      orgProduct.product = this.data.product;
      this.repositoriesService.getForks(orgProduct).subscribe(val => {
        if (val && val.length > 0) {
          this.forks = val.slice(0,5);
        } else {
          this.forks = [];
        }
      }, error => {
        console.log(error);
      });
    } catch (ex) {
      console.log(ex);
    }
  }

}
