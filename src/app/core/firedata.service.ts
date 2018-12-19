import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post, PostComplex } from './post';

@Injectable({
  providedIn: 'root'
})
export class FiredataService {

  private postsCollection: AngularFirestoreCollection<Post>;
  public posts: Observable<PostComplex[]>;

  constructor( private afs: AngularFirestore ) {

    this.postsCollection  = this.afs.collection('posts', ref => ref.orderBy('updatedAt', 'desc'));
    this.posts            = this.getItemsWithIDs$(this.postsCollection);

  }

  // CRUD
  public getItemsWithIDs$(ref: AngularFirestoreCollection): Observable<any[]> {
    return ref.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            return {
              data: a.payload.doc.data(),
              id: a.payload.doc.id
            };
          });
        }));
  }

}
