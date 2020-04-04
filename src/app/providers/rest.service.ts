import { Injectable } from '@angular/core';

// เรียก HttpsClient  เพื่อทำการส่งตาม apiUrl ที่เราจะใช้ส่ง
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  // ส่วนนี้คือการส่งข้อมูลเข้าไป โดยเราจะใช้ URL api ในการส่ง post ส่วนนี้ทำให้คนมือใหม่ หลายต่อหลายคนเกาหัวมาแล้ว เพราะไม่เข้าใจ apiUrl เช่น wwww.google.com/api/ 
  // โดยให้ /login.php ยิง post เข้าไป จะได้ www.google.com/api/login.php หากใช้โปรแกรม Postman ยิงดูก็จะเห็นค่าที่ถูกส่งกลับ 
  apiUrl = 'โปรดระบุ API ของท่าน';
  constructor(public http: HttpClient) { }
  
  // ประกาศฟังก์ชั่น โดยรับค่า จะตั้งตัวแปรอะไรก็ได้ โดยรับมาจาก src>app>login>login.page.ts โดยให้ทำการส่งเป็น JSON ไฟล์ 
  login(requestData){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/login.php', JSON.stringify(requestData)).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
    });
  }

  // ประกาศฟังก์ชั่น โดยรับค่า จะตั้งตัวแปรอะไรก็ได้ โดยรับมาจาก src>app>register>register.page.ts โดยให้ทำการส่งเป็น JSON ไฟล์ 
  register(requestData){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/register.php', JSON.stringify(requestData)).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
    });
  }

  // ประกาศฟังก์ชั่น โดยแสดงค่า จะตั้งตัวแปรอะไรก็ได้ โดยรับมาจาก src>app>register>home.page.ts โดยให้ทำการส่งเป็น JSON ไฟล์ 
  selectbook(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/select-book.php').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  // ประกาศฟังก์ชั่น โดยรับค่า จะตั้งตัวแปรอะไรก็ได้ โดยรับมาจาก src>app>register>home.page.ts โดยให้ทำการส่งเป็น JSON ไฟล์ 
  deletebooks(requestbooks){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/delete-books.php', JSON.stringify({topic: requestbooks}))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  // ประกาศฟังก์ชั่น โดยรับค่า จะตั้งตัวแปรอะไรก็ได้ โดยรับมาจาก src>app>register>add-book.page.ts โดยให้ทำการส่งเป็น JSON ไฟล์ 
  addbooks(requestData){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/addbooks.php', JSON.stringify(requestData)).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
    });
  }

  // ประกาศฟังก์ชั่น โดยรับค่า จะตั้งตัวแปรอะไรก็ได้ โดยแสดงค่า src>app>register>edit-edit.page.ts โดยให้ทำการส่งเป็น JSON ไฟล์ 
  selectbookindex(requestData){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/select-book-index.php', JSON.stringify(requestData)).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
    });
  }

  // ประกาศฟังก์ชั่น โดยรับค่า จะตั้งตัวแปรอะไรก็ได้ โดยรับมาจาก src>app>register>edit-book.page.ts โดยให้ทำการส่งเป็น JSON ไฟล์ 
  editbooks(requestDatas){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/editbooks.php', JSON.stringify(requestDatas)).subscribe(data => {
        resolve(data)
      }, err => {
        reject(err)
      });
    });
  }
}
