import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/app/core/modal.service';
import { FiredataService } from 'src/app/core/firedata.service';
import { Observable } from 'rxjs';

import { PostComplex } from 'src/app/models/post';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts$: Observable<PostComplex[]>;
  posts: PostComplex[];

  constructor(
    private modalService: ModalService,
    public firedataService: FiredataService
  ) {}

  ngOnInit() {
    this.posts$ = this.firedataService.getPosts();
    this.posts$.subscribe(v => this.posts = v);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
