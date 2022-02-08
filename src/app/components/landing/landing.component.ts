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
  public orgval: FormControl; // organization dropdown formcontrol
  public nval: FormControl; // n-value input formcontrol
  public mval: FormControl; // m-value input formcontrol
  public results: any[]; // list for storing received list of products from github api
  public isSearching: boolean; // flag to enable mat-loader/spinner while search

  constructor(private repositoriesService: RepositoriesService, // injecting services &
    public dialog: MatDialog) { // constructor used for initial variable assignment
    this.organizationList = [{ value: 'Google', viewValue: 'Google' },
    { value: 'Microsoft', viewValue: 'Microsoft' },
    { value: 'Facebook', viewValue: 'Facebook' }];
    this.orgval = new FormControl('', [Validators.required, Validators.nullValidator]);
    this.nval = new FormControl(10, [Validators.required, Validators.nullValidator]);
    this.mval = new FormControl(5, [Validators.required, Validators.nullValidator]);
    this.results = [];
    this.isSearching = false;
  }

  ngOnInit() {
  }

  public fetchRepos() { // method for getting data of organization based on n value
    try {
      let repoDetails = new RepoDetails();
      repoDetails.organization = this.orgval.value;
      repoDetails.n = this.nval.value;
      repoDetails.m = this.mval.value;
      this.isSearching = true;
      this.repositoriesService.getReps(repoDetails).subscribe(val => {
        if (val && val.items.length > 0) { // null and length value check for incomming data
          this.results = val.items;
        } else {
          this.results = [];
        }
        this.isSearching = false;
      }, error => {
        this.isSearching = false;
        console.log(error); // console lof error if any
      });
    } catch (ex) {
      this.isSearching = false;
      console.log(ex); // console lof error if any
    }
  }

  fetchForksinDialog(product: String) {
    this.dialog.open(ForkDialogComponent, {
      data: {
        organization:this.orgval.value,
        product: product,
        m:this.mval.value,
        width: '300px',height:"300px",
      },
    });
  }
}
