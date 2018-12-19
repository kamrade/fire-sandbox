import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post, PostComplex } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class FiredataService {
  private postsCollection: AngularFirestoreCollection<Post>;
  public posts$: Observable<PostComplex[]>;

  constructor(private afs: AngularFirestore) {
    this.postsCollection = this.afs.collection('posts', ref =>
      ref.orderBy('updatedAt', 'desc')
    );
    this.posts$ = this.getPosts();
  }

  public getPosts(): Observable<any[]> {
    return this.postsCollection.snapshotChanges().pipe(
      map(actions => {
        const postsComplex = actions.map(a => {
          return {
            data: a.payload.doc.data(),
            id: a.payload.doc.id
          };
        });
        return postsComplex;
      })
    );
  }

  public async createPost(itemData: Post): Promise<any> {
    return this.postsCollection
      .add(itemData)
      .then(() => {
        console.log(':: post created');
      })
      .catch(err => {
        console.log(':: post remove error', err);
      });
  }
}
