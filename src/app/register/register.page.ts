import { Component, OnInit } from '@angular/core';
// เรียกใช้ Alert แสดงผลแทนการใช้ console.log เพื่อให้ผู้ใช้รู้ว่าอ่อ ข้อมูลไม่ได้กรอก
import { AlertController } from '@ionic/angular';

// เรียกใช้ RestDervice ที่เราทำการสร้างขึ้นมา เอาไว้ใช้ทำอะไรงง เอาไว้ส่งค่า Rest api ผมตั้งชื่อให้จำได้ง่าย ถ้าผมตั้งยาก ๆ ก็เกาหัวกันอีก path src>app>providers>rest.service.ts
import { RestService } from './../providers/rest.service';
//เรียกใช้ Router มันคืออะใยงง มันคือการเรียกใช้ pathบอกตำแหน่งว่า จะไปไหนต้องบอกฉันก่อนนะโดยที่ตัวการมันคือ app-routing.module.th
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // ประกาศค่า เพื่อจะได้รับ ngModel 
  username: String = '';
  password: String = '';

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

  ionViewWillEnter() {
    console.log('Register')
  }


  // Register สร้าง function ให้ตรงกับ  register.page.html
  async Register() {
    if (this.username.length > 0 && this.password.length > 0) {
      console.log('มีข้อมูล')

      const requestData = {
        username: this.username,
        password: this.password
      };
      this.restProvider.register(requestData).then(
        data => {
          this.response = data;
          if (this.response.status == "error") {
            // เรียกใช้ฟังก์ชั่น
            this.ErrorData()
          } else {
            // เรียกใช้ router บอกตำแหน่งให้ไปส่วน login
            this.router.navigate(['login'])
          }
        },
        err => {
          console.log(err);
        }
      );

    } else {
      // เรียกใช้ฟังก์ชั่น
      this.ErrorInput()
    }
  }
  // End Register

  //ส่วนการแจ้งเตือน
  async ErrorData() {
    const alertNotError = await this.alertController.create({
      header: 'ข้อผิดพลาด',
      message: 'Username ถูกใช้ไปแล้ว',
      buttons: ['ยอมรับ']
    });
    await alertNotError.present();
  }
    //ส่วนการแจ้งเตือน 
  async ErrorInput() {
    const alertNotError = await this.alertController.create({
      header: 'ข้อผิดพลาด',
      message: 'ท่านยังไม่ได้กรอกข้อมูลลงใน Form สมัครสมาชิก',
      buttons: ['ยอมรับ']
    });
    await alertNotError.present();
  }


  // Backs สร้าง function เพื่อทำการกลับไปหน้า login register.page.html
  backs() {
    this.router.navigate(['login'])
  }
  // End backs
}
