import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Blog } from '../blog';
import {BlogService} from '../blog.service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
blogForm!:FormGroup;
editForm!:FormGroup;
blogDetails:any;
blogsData:any = []
blogObj: Blog={
  id:'',
  title:'',
  description:'',
  date: ''
}
  constructor(private fb:FormBuilder, private blogService:BlogService) { 
    this.blogForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      date:['',Validators.required]
    })
    this.editForm = this.fb.group({
      edit_title:['',Validators.required],
      edit_description:['',Validators.required],
      edit_date:['',Validators.required]
    })
  }

  ngOnInit() {
    this.getAllBlogs()
   
  }
  addBlog(){
    const {value} = this.blogForm
    console.log(value)
    this.blogObj.id = '',
    this.blogObj.title  = value.title,
    this.blogObj.description  = value.description,
    this.blogObj.date = value.date

    this.blogService.addBlog(this.blogObj).then((blog)=>{
      if(blog){
      alert('Blog added successfully')
      this.blogForm.reset();
      }
    })
  }

  // Get All Blogs
  getAllBlogs(){
    this.blogService.getBlogs().subscribe((res:Blog[])=>{
      console.log(res)
      this.blogsData = res
    })
  }

  // Delete Blogs
  deleteBlog(blog: Blog){
    let decision = confirm('Do yo really want to delele this blog ?')
    if(decision == true) 
    {
      this.blogService.deleteBlog(blog)
    }
  }

  getAllDetails(blog: Blog){
    this.blogDetails = blog
    console.log(this.blogDetails)
  }

  // Update Blogs
  updateBlog(blog:Blog){
    const {value} = this.editForm
    console.log(value);
    (this.blogObj.id = blog.id),
    (this.blogObj.title = value.edit_title),
    (this.blogObj.description = value.edit_description),
    (this.blogObj.date = value.edit_date)
    
    this.blogService.updateBlog(blog,this.blogObj).then(()=>{
      alert("Blog updated successfully")
    })
    this.editForm.reset()
  }
}
