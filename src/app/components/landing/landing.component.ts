import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Orgainization } from '../../interfaces/orgainization.interface';
import { OrgProduct } from '../../models/orgProduct.model';
import { RepoDetails } from '../../models/RepoDetails.model';
import { RepositoriesService } from '../../services/repositories.service';
import { ForkDialogComponent } from '../fork-dialog/fork-dialog.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public organizationList: Orgainization[];
  public orgval: FormControl;
  public nval: FormControl;
  public mval: FormControl;
  public results: any[];
  public searching: boolean;

  constructor(private repositoriesService: RepositoriesService,
    public dialog: MatDialog) {
    this.organizationList = [{ value: 'Google', viewValue: 'Google' },
    { value: 'Microsoft', viewValue: 'Microsoft' },
    { value: 'Facebook', viewValue: 'Facebook' }];
    this.orgval = new FormControl('', [Validators.required, Validators.nullValidator]);
    this.nval = new FormControl(10, [Validators.required, Validators.nullValidator]);
    this.mval = new FormControl(5, [Validators.required, Validators.nullValidator]);
    this.results = [];
    this.searching = false;
  }

  ngOnInit() {
  }

  public fetchRepos() {
    try {
      let repoDetails = new RepoDetails();
      repoDetails.organization = this.orgval.value;
      repoDetails.n = this.nval.value;
      repoDetails.m = this.mval.value;
      this.searching = true;
      this.repositoriesService.getReps(repoDetails).subscribe(val => {
        if (val && val.items.length > 0) {
          this.results = val.items;
        } else {
          this.results = [];
        }
        this.searching = false;
      }, error => {
        this.searching = false;
        console.log(error);
      });
    } catch (ex) {
      this.searching = false;
      console.log(ex);
    }
  }

  fetchForksinDialog(product: String) {
    this.dialog.open(ForkDialogComponent, {
      data: {
        organization:this.orgval.value,
        width: '300px',height:"300px",
        product: product,
      },
    });
  }
}
