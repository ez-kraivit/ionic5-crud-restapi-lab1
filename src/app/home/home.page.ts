import { Component } from '@angular/core';

// เรียกใช้ RestDervice ที่เราทำการสร้างขึ้นมา เอาไว้ใช้ทำอะไรงง เอาไว้ส่งค่า Rest api ผมตั้งชื่อให้จำได้ง่าย ถ้าผมตั้งยาก ๆ ก็เกาหัวกันอีก path src>app>providers>rest.service.ts
import { RestService } from './../providers/rest.service';
//เรียกใช้ Router มันคืออะใยงง มันคือการเรียกใช้ pathบอกตำแหน่งว่า จะไปไหนต้องบอกฉันก่อนนะโดยที่ตัวการมันคือ app-routing.module.th
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // ค่าที่ถูกส่งกลับมาให้แสดงโดยเราให้เป็น any any นะจ๊ะนายจ้าา มันคือค่าที่ไม่สามารถบอกได้ว่าเป็นค่าอะไรก็ได้
  books: any

  // ทำการประกาศเรียกใช้ object Router and restProvider
  constructor(
    private router: Router,
    public restProvider: RestService
  ) {

  }

  // หากเข้ามาในส่วนของ Homepage ให้ทำการเรียกใช้ ฟังก์ชั่น Showbook แสดงผล
  ionViewDidEnter() {
    this.Showbook()
  }

  // ทำการเรียกใช้ Rest Api ให้แสดงข้อมูลมาในหน้าแรก 
  Showbook() {
    this.restProvider.selectbook().then(data => {
      this.books = data
      console.log(this.books)
    })
  }
  // End showbook

  // ออกจากระบบ ตอนนี้ยังไม่ได้สอนการใช้งาน การเก็บค่าแต่อนาคตจะมาสอนให้ครับ
  logout() {
    this.router.navigate(['login'])
  }
  // End logout

  // ทำการเรียกใช้ Rest Api ฟังก์ชั่น deletebook เราจะทำการลบข้อมูล โดยใช้ topic
  deletebook(event, address) {
    this.restProvider.deletebooks(address.topic)
    this.ionViewDidEnter()
  }
  // End deletebook

  // เรียกใช้ฟังก์ชั่นในหน้า home.page.html หากจะทำการ Addbook จะไปหน้าเพื่อแอดข้อมูลเพิ่ม
  Addbook(){
    this.router.navigate(['add-book'])
  }
  // End addbook

    // เรียกใช้ฟังก์ชั่นในหน้า home.page.html หากจะทำการ editbook จะไปหน้าแก้ไขข้อมูล
  editbook(event,book){
    // อ้างอิงตำแหน่งการเข้าข้อมูล เช่น edit-book:topic เราจะทำการส่งข้อมูลไปหน้า edit-book
      this.router.navigate(['edit-book',book.topic])
    }

}
