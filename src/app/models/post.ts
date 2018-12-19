export class Post {
  title: string;
  content: string;
  createdAt: number;
  updatedAt?: number;
}

export class PostComplex {
  id: string;
  data: Post;
}
