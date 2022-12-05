import { Injectable } from '@angular/core';
import { Blog } from './blog';
import { collectionData, Firestore, deleteDoc, doc, addDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private fs: Firestore) { }

  // Add new Blog
  addBlog(blog: Blog) {
    blog.id = doc(collection(this.fs, 'id')).id
    return addDoc(collection(this.fs, 'Blogs'), blog)
  }
  // Get all Blogs from Database
  getBlogs(): Observable<Blog[]> {
    let blogsRef = collection(this.fs, 'Blogs')
    return collectionData(blogsRef, { idField: 'id' }) as Observable<Blog[]>
  }

  // Delete Blog
  deleteBlog(blog: Blog) {
    let docRef = doc(this.fs, `Blogs/${blog.id}`);
    return deleteDoc(docRef)
  }

  // Update Blogs from Database
  updateBlog(blog: Blog, blogs: any) {
    let docRef = doc(this.fs, `Blogs/${blog.id}`);
    return updateDoc(docRef, blogs)
  }
}
