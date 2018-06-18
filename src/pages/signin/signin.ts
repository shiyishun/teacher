import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {RedditData} from '../../providers/reddit-data';
import{GlobalStorage} from '../../providers/global-storage';
import{LocalStorage} from '../../providers/local-storage'


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  score: any;
  testRadioOpen: boolean;
  testRadioResult;
  due: boolean;
  due2: boolean;
  judge1: boolean;
  judge2: boolean;
  coursename: string;
  id: any;
  bcalldate: any;
  acalldate: any;
  ccalldate: any;
  result: any;
  result2: any;
  callposition: any;
  call1 = [];
  call2 = [];
  pname = [];
  hang: any;
  lie: any;
  position: any;
  hangT = [];
  lieT = [];
  token: String;
  courseList =[];
  courseTimeList = [];
  callOderList = [];
  callTherollList=[];
  courseId = '';
  courseTimeId ='';
  callOrder = '';
  classShape = '';
  isShowPosition = true;
  isShowPositonGrid = false;
  now = new Date();

  constructor(public toastCtrl: ToastController, public alerCtrl: AlertController,  private localStorage: LocalStorage,
              public navCtrl: NavController, public navParams: NavParams, public CallData: RedditData, public globalStorage: GlobalStorage) {

     let loginUser:any = this.localStorage.get("loginUser", null);
     this.token = loginUser['token'];
     this.due = true;
     this.getCourseList();
     this.fullCallOderList(20);
  }

  fullCallOderList(l){

    for(var i=1; i<=l; i++){
      var co = {"key":"第"+i+"周", "value": i};
      this.callOderList.push(co);
    }

  }

  switchType() {
    console.log(this.courseId);
    this.callTherollList =[];
    this.CallData.getCourseTimeList(this.courseId).subscribe(
      result => {
        if (result.code == '0') {
          this.courseTimeList = result.data;
          console.log(this.courseTimeList);
          if(this.courseTimeId!=''&&this.callOrder!=''){
            this.getCallThreollList();
          }
        }else {
          let errmsg = result.errmsg;
          let toast = this.toastCtrl.create({
            message: errmsg,
            duration: 2000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'ClOSE'
          });
          toast.present();
        }
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('courseListSelect completed');
      }
    );

  }

  switchType2() {
    this.callTherollList =[];
    console.log(this.courseTimeId);
    if(this.courseTimeId!=''&&this.callOrder!=''){
      this.getCallThreollList();
    }
  }

  switchType3() {
    this.callTherollList =[];
    console.log(this.callOrder);
    if(this.courseTimeId!=''&&this.callOrder!=''){
      this.getCallThreollList();
    }
  }

  getCourseList(){
    this.CallData.getCourseList(this.token).subscribe(
      result => {

        if (result.code == '0') {

          this.courseList = result.data;
          console.log(this.courseList)
        }else {
          let errmsg = result.errmsg;
          let toast = this.toastCtrl.create({
            message: errmsg,
            duration: 2000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'ClOSE'
          });
          toast.present();
        }
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('courseListSelect completed');
      }
    );

  }


  getCallThreollList() {
    this.closePosition();
    this.CallData.getCallTherollList(this.courseId, this.courseTimeId, this.callOrder).subscribe(
      result => {

        if (result.code == '0') {
          this.callTherollList = result.data;
          console.log(this.callTherollList)
        } else {
          let errmsg = result.errmsg;
          let toast = this.toastCtrl.create({
            message: errmsg,
            duration: 2000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'ClOSE'
          });
          toast.present();
        }
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('courseListSelect completed');
      }
    );
  }


  createSignin() {

    if(this.courseId==''||this.courseTimeId==''||this.callOrder==''){
      let toast = this.toastCtrl.create({
        message: "请选择完整的签到信息",
        duration: 2000,
        position: 'middle',
        showCloseButton: true,
        closeButtonText: 'ClOSE'
      });
      toast.present();
    }

    if(this.callTherollList.length>0){
      this.signinConfirm();
    }else {
      this.signin();
    }

  }

  signin(){
    this.CallData.createSignin(this.courseId, this.courseTimeId, this.callOrder).subscribe(
      result => {

        if (result.code == '0') {

          this.getCallThreollList();
        } else {
          let errmsg = result.errmsg;
          let toast = this.toastCtrl.create({
            message: errmsg,
            duration: 2000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'ClOSE'
          });
          toast.present();
        }
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('courseListSelect completed');
      }
    );
  }


  signinConfirm(){
    let alert = this.alerCtrl.create();
    alert.setTitle('开始签到');
    alert.setMessage("当前已经生成签到表了，是否继续签到？");

    alert.addButton({
      text:'取消'
    });
    alert.addButton({
      text: '确认',
      handler: data => {
        this.signin();
      }
    });

    alert.present();
  }


  openPosition(){
    this.isShowPosition = false;
    this.isShowPositonGrid = true;
    this.createPositons();

  }

  closePosition(){
    this.isShowPosition = true;
    this.isShowPositonGrid = false;
  }

  createPositons() {
    var classShape = '0*0';
    for(var i=0;i<this.courseTimeList.length; i++){
      if(this.courseTimeId==this.courseTimeList[i].courseTimeId){
        classShape = this.courseTimeList[i].classShape;
      }
    }
    console.log(classShape);

    this.bcalldate = "" + this.now.getFullYear() + "-" + (this.now.getMonth() + 1) + "-" + this.now.getDate();
    this.acalldate = this.bcalldate;
    this.ccalldate = this.bcalldate;

    var temp = [];
    var name = [];
    var no = [];
    var markId = [];
    var major =[];
    var classNo =[];
    this.classShape = classShape;
    this.hang = parseInt(this.classShape.split("*")[0]);
    this.lie = parseInt(this.classShape.split("*")[1]);


    for(var i=0;i<this.callTherollList.length; i++){
        console.log(this.callTherollList[i].callPosition);
        if(this.callTherollList[i].callPosition!="0*0") {
          temp.push(this.callTherollList[i].callPosition);
          name.push(this.callTherollList[i].name);
          no.push(this.callTherollList[i].no);
          markId.push(this.callTherollList[i].markId);
          major.push(this.callTherollList[i].major);
          classNo.push(this.callTherollList[i].classNoStr);
        }
    }

    for (var i = 0; i < temp.length; i++) {

      this.call1[i] = parseInt(temp[i].split("*")[0]);
      this.call2[i] = parseInt(temp[i].split("*")[1]);
      console.log(this.call1[i]);
      console.log(this.call2[i]);
    }

    console.log(this.hang);
    console.log(this.lie);
    for (var j = 0; j < this.hang; j++) {
      this.hangT[j] = j;
    }
    for (var x = 0; x < this.lie; x++) {
      this.lieT[x] = x;
    }
    console.log(this.hangT);
    console.log(this.lieT);
    var state = [this.hang];


    var n = this.hang, m = this.lie;
    var hhh = new Array();
    for (var i = 0; i < n; i++) {
      hhh[i] = new Array();
      for (var j = 0; j < m; j++) {
        hhh[i][j] = new Array();
        hhh[i][j][0] = "";
        hhh[i][j][1] = 0;
        hhh[i][j][2] = 0;
        hhh[i][j][3] = '';
        hhh[i][j][4] = '';
        hhh[i][j][5]= '';
      }
    }

    for (var i = 0; i < this.call1.length; i++) {
      hhh[this.call1[i] - 1][this.call2[i] - 1][0] = name[i];
      hhh[this.call1[i] - 1][this.call2[i] - 1][1] = 1;
      hhh[this.call1[i] - 1][this.call2[i] - 1][2] = no[i];
      hhh[this.call1[i] - 1][this.call2[i] - 1][3] = markId[i];
      hhh[this.call1[i] - 1][this.call2[i] - 1][4] = major[i];
      hhh[this.call1[i] - 1][this.call2[i] - 1][5] = classNo[i];

    }
    this.position = hhh;

  }

look(j, i){

  let alert = this.alerCtrl.create();
  alert.setTitle('个人信息');

  alert.addInput({
    type:'text',
    value: '学号：'+this.position[j-1][i-1][2]
  });
  alert.addInput({
    type:'text',
    value: '姓名：'+this.position[j-1][i-1][0]
  });
  alert.addInput({
    type:'text',
    value: '专业：'+this.position[j-1][i-1][4]
  });

  alert.addInput({
    type:'text',
    value: '班级：'+this.position[j-1][i-1][5]
  });
  alert.addButton('关闭');
  alert.present();

}































  judge11() {
    this.judge1 = true;
    this.judge2 = false;

  }

  judge22() {
    this.judge2 = true;
    this.judge1 = false;
  }

  test() {
    var temp = [];
    var pname = [];
    var ID = [];
    this.CallData.getCallTheRollBetweenDateAndCoursename(this.bcalldate, this.bcalldate, this.coursename).subscribe(
      result => {
        this.result = result.callTheRolls;
        for (var i = 0; i < result.callTheRolls.length; i++) {
          if (result.callTheRolls[i].callstate != "旷课") {
            temp.push(result.callTheRolls[i].callposition);
            //pname.push(result.callTheRolls[i].pname);
            pname.push(result.callTheRolls[i].pname);
            ID.push(result.callTheRolls[i].ID);
          }
        }
        console.log(temp);
        console.log(pname);
        //console.log(this.now);
        for (var i = 0; i < temp.length; i++) {
          this.call1[i] = parseInt(temp[i].split("*")[0]);
          this.call2[i] = parseInt(temp[i].split("*")[1]);
          console.log(this.call1[i]);
          console.log(this.call2[i]);
        }
        console.log(this.hang);
        console.log(this.lie);
        for (var j = 0; j < this.hang; j++) {
          this.hangT[j] = j;
        }
        for (var x = 0; x < this.lie; x++) {
          this.lieT[x] = x;
        }
        console.log(this.hangT);
        console.log(this.lieT);
        var state = [this.hang];

        var n = this.hang, m = this.lie;
        var hhh = new Array();
        for (var i = 0; i < n; i++) {
          hhh[i] = new Array();
          for (var j = 0; j < m; j++) {
            hhh[i][j] = new Array();
            hhh[i][j][0] = "null";
            hhh[i][j][1] = 0;
            hhh[i][j][2] = 0;
          }
        }

        for (var i = 0; i < this.call1.length; i++) {
          hhh[this.call1[i] - 1][this.call2[i] - 1][0] = pname[i];
          hhh[this.call1[i] - 1][this.call2[i] - 1][1] = 1;
          hhh[this.call1[i] - 1][this.call2[i] - 1][2] = ID[i];
        }
        this.position = hhh;
        this.id = ID;
        console.log(this.id);
      })
  }

  find() {
    this.due = true;
    this.due2 = false;
    this.bcalldate = "" + this.now.getFullYear() + "-" + (this.now.getMonth() + 1) + "-" + this.now.getDate();
    this.acalldate = this.bcalldate;
    this.ccalldate = this.bcalldate;

    var temp = [];
    var pname = [];
    var ID = [];
    this.callposition = "8*8";
    this.hang = parseInt(this.callposition.split("*")[0]);
    this.lie = parseInt(this.callposition.split("*")[1]);

    temp.push("6 * 6");
    temp.push("7 * 7");
    for (var i = 0; i < temp.length; i++) {
      this.call1[i] = parseInt(temp[i].split("*")[0]);
      this.call2[i] = parseInt(temp[i].split("*")[1]);
      console.log(this.call1[i]);
      console.log(this.call2[i]);
    }

    console.log(this.hang);
    console.log(this.lie);
    for (var j = 0; j < this.hang; j++) {
      this.hangT[j] = j;
    }
    for (var x = 0; x < this.lie; x++) {
      this.lieT[x] = x;
    }
    console.log(this.hangT);
    console.log(this.lieT);
    var state = [this.hang];


    var n = this.hang, m = this.lie;
    var hhh = new Array();
    for (var i = 0; i < n; i++) {
      hhh[i] = new Array();
      for (var j = 0; j < m; j++) {
        hhh[i][j] = new Array();
        hhh[i][j][0] = "null";
        hhh[i][j][1] = 0;
        hhh[i][j][2] = 0;
      }
    }

    for (var i = 0; i < this.call1.length; i++) {
      hhh[this.call1[i] - 1][this.call2[i] - 1][0] = pname[i];
      hhh[this.call1[i] - 1][this.call2[i] - 1][1] = 1;
      hhh[this.call1[i] - 1][this.call2[i] - 1][2] = ID[i];
    }
    this.position = hhh;
    this.id = ID;
    console.log(this.id);
  }

  find2(){ this.due2=true;
    this.due=false;
    var temp=[];

    this.bcalldate=""+this.now.getFullYear()+"-"+(this.now.getMonth()+1)+"-"+this.now.getDate();//this.now;
    this.acalldate=this.bcalldate;
    this.ccalldate=this.bcalldate;
    console.log(this.bcalldate);
    this.CallData.getCallTheRollBetweenDateAndCoursename(this.acalldate,this.ccalldate,this.coursename).subscribe(
      result=>{
        this.result2=result.callTheRolls;
console.log(result.callTheRolls);
        for(var i=0;i<result.callTheRolls.length;i++){
         if(result.callTheRolls[i].callstate!="旷课"){
            // console.log("成功");
           temp.push(result.callTheRolls[i].callposition);
         }
        }
        console.log(temp);
        //console.log(this.now);

      }
    )
  }
start(){
this.CallData.callOverByCoursenameAndDate(this.coursename).subscribe(
  result=>{
    console.log(result);
  }
)
}
  question(j, i){
  console.log(j);
  console.log(i);
    let alert = this.alerCtrl.create();
    alert.setTitle('课堂打分'+this.position[j-1][i-1][2]);
    alert.addInput({
      type: 'radio',
      label: '95',
      value: '95',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: '85',
      value: '85'
    });

    alert.addInput({
      type: 'radio',
      label: '75',
      value: '75'
    });

    alert.addInput({
      type: 'radio',
      label: '65',
      value: '65'
    });

    alert.addInput({
      type: 'radio',
      label: '55',
      value: '55'
    });
    alert.addButton('取消');
    var score;
    alert.addButton({
      text: '确认',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
        score=data;
        console.log(score);
        var TheID=this.position[j-1][i-1][2];
        console.log(TheID);
        this.CallData.createQuestion(score,TheID,this.coursename).subscribe(
          result=>{
            let toast = this.toastCtrl.create({
              message: 'ID'+TheID+''+j+'行'+i+'列'+'分数'+score,
              duration:3000
            });
            toast.present();
          }
        )
      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
    // this.CallData.
  }










}

