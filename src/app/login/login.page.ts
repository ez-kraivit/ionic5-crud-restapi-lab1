import { Component, OnInit } from '@angular/core';

// เรียกใช้ RestDervice ที่เราทำการสร้างขึ้นมา เอาไว้ใช้ทำอะไรงง เอาไว้ส่งค่า Rest api ผมตั้งชื่อให้จำได้ง่าย ถ้าผมตั้งยาก ๆ ก็เกาหัวกันอีก path src>app>providers>rest.service.ts
import { RestService } from './../providers/rest.service';
//เรียกใช้ Router มันคืออะใยงง มันคือการเรียกใช้ pathบอกตำแหน่งว่า จะไปไหนต้องบอกฉันก่อนนะโดยที่ตัวการมันคือ app-routing.module.th
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // ประกาศค่า เพื่อจะได้รับ ngModel 
  username: String = '';
  password: String = '';

  // ค่าที่ถูกส่งกลับมาให้แสดงโดยเราให้เป็น any any นะจ๊ะนายจ้าา มันคือค่าที่ไม่สามารถบอกได้ว่าเป็นค่าอะไรก็ได้
  response: any;

  // ทำการประกาศเรียกใช้ object Router and restProvider
  constructor(
    private router: Router,
    public restProvider: RestService
  ) { }

  // https://ionicframework.com/docs/angular/lifecycle lifecycle ยังไม่สอบหึหึ กั๊กไว้ก่อน
  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('Login')
  }



  // Logins สร้าง function ให้ตรงกับ login.page.html
  Logins() {
    // ตรวจสอบหากไม่ได้ทำการตรวจสอบว่า หากไม่มีค่าจะไม่เข้ามาทำในคำสั่งนี้ โดยที่เราจะให้แสดงแบบ alert ก็ได้
    if (this.username.length > 0 && this.password.length > 0) {
      console.log('ข้อมูลมี');

      // เก็บข้อมูลลงใน object requestData จะตั้งชื่อว่าอะไรก็ตามที่เราชอบเลย
      const requestData = {
        username: this.username,
        password: this.password
      };
      // แสดงผลเพื่อทำการตรวจสอบค่าว่าถูกส่งมาหรือเปล่านะ
      console.log(requestData)

      // เรียกใช้ restProvider function login path src>app>providers>rest.service.ts โดยทำการส่ง requestData 
      this.restProvider.login(requestData).then(
        data => {
          this.response = data;
          console.log(this.response);

          // ทำการตรวจสอบว่า หาก return ค่ามาเป็น error จะให้ไปสมัครสมาชิกนะ หากไม่ใช่ error ก็เข้าสู่ระบบได้เลย
          if (this.response.status == "error") {
            this.router.navigate(['register'])
          }else{
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
      console.log('ข้อมูลไม่มี');
    }
  }
  // End Login

  // Register สร้าง function ให้ตรงกับ login.page.html
  Register() {
    this.router.navigate(['register'])
  }
  // End Register
}



// แค่สอบก็เคลียดแล้ว จะเขียนโปรแกรมทำไหมให้เคลียด เห้อ~~~~~~