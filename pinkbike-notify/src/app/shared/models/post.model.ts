export interface IPost {
    id: string
    postId: string
    date: string
    title: string
    description: string
    category: string
    url: string
    imgUrl: string
    price: string
}

export class Post {
    constructor()
    constructor(id?: string, url?: string, title?: string, description?: string, imgUrl?: string)
    constructor(public id?: string, public url?: string, public title?: string, public description?: string, public imgUrl?: string) {
      this.id = id || null;
      this.url = url || null;
      this.title = title || null;
      this.description = description || null;
      this.imgUrl = imgUrl || null;
    }
}
