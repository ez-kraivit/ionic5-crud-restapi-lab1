import { Component, OnInit } from '@angular/core';
// เรียกใช้ Alert แสดงผลแทนการใช้ console.log เพื่อให้ผู้ใช้รู้ว่าอ่อ ข้อมูลไม่ได้กรอก
import { AlertController } from '@ionic/angular';
// เรียกใช้ RestDervice ที่เราทำการสร้างขึ้นมา เอาไว้ใช้ทำอะไรงง เอาไว้ส่งค่า Rest api ผมตั้งชื่อให้จำได้ง่าย ถ้าผมตั้งยาก ๆ ก็เกาหัวกันอีก path src>app>providers>rest.service.ts
import { RestService } from './../providers/rest.service';
//เรียกใช้ Router มันคืออะใยงง มันคือการเรียกใช้ pathบอกตำแหน่งว่า จะไปไหนต้องบอกฉันก่อนนะโดยที่ตัวการมันคือ app-routing.module.th
import { Router } from '@angular/router';

// ทำการเรียก GET Router พวก URL ทั้งหลาย
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.page.html',
  styleUrls: ['./edit-book.page.scss'],
})
export class EditBookPage implements OnInit {
  topic: String = null;
  detail: String = null;
  idb: any
  book: any

  response: any
  // ทำการประกาศเรียกใช้ object Router and restProvider
  constructor(
    private router: Router,
    public restProvider: RestService,
    public alertController: AlertController,
    private getRout: ActivatedRoute
  ) {

  }

  // การส่งค่าจาก path 1 มา path2 หากข้อมูลถูกส่งเราจะนำมาแสดงผล
  ngOnInit() {
    this.topic = this.getRout.snapshot.paramMap.get('topic');
  }

  // ประกาศฟังก์ชันหากถูกแสดงในหน้า edit-book ให้เรียกใช้ ทันที
  ionViewDidEnter() {
    // ลองแสดงข้อมูล ข้อมูลที่รับมาจาก GetRout
    console.log(this.topic)
    this.showdetail()
  }


  showdetail() {
    const requestDatas = {
      topic: this.topic
    };
    this.restProvider.selectbookindex(requestDatas).then(data => {
      this.book = data[0]
      console.table(data[0])
      this.idb = this.book.idb
      this.detail = this.book.detail
    });
  }

  // Editbook สร้าง function ให้ตรงกับ edit-book.page.html
  async editbook() {
    if (this.topic.length > 0 && this.detail.length > 0) {
      // เก็บข้อมูลลงใน object requestData จะตั้งชื่อว่าอะไรก็ตามที่เราชอบเลย
      const requestDatas = {
        idb: this.idb,
        topic: this.topic,
        detail: this.detail
      };
      // แสดงผลเพื่อทำการตรวจสอบค่าว่าถูกส่งมาหรือเปล่านะ
      console.table(requestDatas)

      // เรียกใช้ restProvider function editbooks path src>app>providers>rest.service.ts โดยทำการส่ง requestData 
      this.restProvider.editbooks(requestDatas).then(
        result => {
          this.response = result;
          if (this.response.status == "error") {
            this.ErrorData();
          } else {
            this.router.navigate(['home'])
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.ErrorInput();
    }
  }
  // End editbook


  //ส่วนการแจ้งเตือน
  async ErrorData() {
    const alertNotError = await this.alertController.create({
      header: 'ข้อผิดพลาด',
      message: 'ข้อมูลที่แก้ไขไม่ถูกต้อง',
      buttons: ['ยอมรับ']
    });
    await alertNotError.present();
  }
  //ส่วนการแจ้งเตือน 
  async ErrorInput() {
    const alertNotError = await this.alertController.create({
      header: 'ข้อผิดพลาด',
      message: 'ท่านยังไม่ได้กรอกข้อมูลลงใน Form แก้ไขหนังสือ',
      buttons: ['ยอมรับ']
    });
    await alertNotError.present();
  }


  // เรียกใช้ฟังก์ชั่น backs add-book.page.html ให้ทำการส่งกลับไปหน้า home
  backs() {
    this.router.navigate(['home'])
  }
  //End backs
}
