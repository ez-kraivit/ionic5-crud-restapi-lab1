import { Component, OnInit } from '@angular/core';
// เรียกใช้ Alert แสดงผลแทนการใช้ console.log เพื่อให้ผู้ใช้รู้ว่าอ่อ ข้อมูลไม่ได้กรอก
import { AlertController } from '@ionic/angular';
// เรียกใช้ RestDervice ที่เราทำการสร้างขึ้นมา เอาไว้ใช้ทำอะไรงง เอาไว้ส่งค่า Rest api ผมตั้งชื่อให้จำได้ง่าย ถ้าผมตั้งยาก ๆ ก็เกาหัวกันอีก path src>app>providers>rest.service.ts
import { RestService } from './../providers/rest.service';
//เรียกใช้ Router มันคืออะใยงง มันคือการเรียกใช้ pathบอกตำแหน่งว่า จะไปไหนต้องบอกฉันก่อนนะโดยที่ตัวการมันคือ app-routing.module.th
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {

  // ประกาศค่า เพื่อจะได้รับ ngModel 
  topic: String = '';
  detail: String = '';

  // ค่าที่ถูกส่งกลับมาให้แสดงโดยเราให้เป็น any any นะจ๊ะนายจ้าา มันคือค่าที่ไม่สามารถบอกได้ว่าเป็นค่าอะไรก็ได้
  response: any;

  // ทำการประกาศเรียกใช้ object Router and restProvider
  constructor(
    private router: Router,
    public restProvider: RestService,
    public alertController: AlertController
  ) {

  }

  ngOnInit() {
  }

  // Addbook สร้าง function ให้ตรงกับ login.page.html
  async Addbook() {
    if (this.topic.length > 0 && this.detail.length > 0) {
      console.log('ข้อมูลมี');

      // เก็บข้อมูลลงใน object requestData จะตั้งชื่อว่าอะไรก็ตามที่เราชอบเลย
      const requestData = {
        topic: this.topic,
        detail: this.detail
      };
      // แสดงผลเพื่อทำการตรวจสอบค่าว่าถูกส่งมาหรือเปล่านะ
      console.log(requestData)

      // เรียกใช้ restProvider function login path src>app>providers>rest.service.ts โดยทำการส่ง requestData 
      this.restProvider.addbooks(requestData).then(
        data => {
          this.response = data;
          console.log(this.response);

          // ทำการตรวจสอบว่า หาก return ค่ามาเป็น error จะให้เข้าแจ้งเตือน หากไม่ใช่ error ก็เข้าสู่ระบบได้เลย
          if (this.response.status == "error") {
            this.ErrorData()
          } else {
            this.router.navigate(['home'])
          }
        },
        err => {
          // หากข้อมูลผิดพลาดในการส่งให้แสดง อาการ error 
          console.log(err);
        }
      );
    } else {
      // กรณีข้อมูลไม่ได้ถูกใส่ครบ
      this.ErrorInput()
    }
  }
  // End addbook

  //ส่วนการแจ้งเตือน
  async ErrorData() {
    const alertNotError = await this.alertController.create({
      header: 'ข้อผิดพลาด',
      message: 'Topic ถูกใช้ไปแล้ว',
      buttons: ['ยอมรับ']
    });
    await alertNotError.present();
  }
  //ส่วนการแจ้งเตือน 
  async ErrorInput() {
    const alertNotError = await this.alertController.create({
      header: 'ข้อผิดพลาด',
      message: 'ท่านยังไม่ได้กรอกข้อมูลลงใน Form การเพิ่มหนังสือ',
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
