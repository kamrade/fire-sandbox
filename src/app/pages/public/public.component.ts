import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FiredataService } from 'src/app/core/firedata.service';
import { Post, PostComplex } from 'src/app/models/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  private posts$: Observable<PostComplex[]>;
  public  posts: PostComplex[];

  constructor(public firedataService: FiredataService) {}

  ngOnInit() {
    this.posts$ = this.firedataService.getPosts();
    this.posts$.subscribe(v => this.posts = v);
  }

  createPost(event, f: NgForm) {

    event.preventDefault();
    const formContent: Post = f.value;
    const createdAt = Date.now();
    const updatedAt = Date.now();

    this.firedataService.createPost({
      createdAt,
      updatedAt,
      ...formContent
    });

    f.reset();
  }


}
