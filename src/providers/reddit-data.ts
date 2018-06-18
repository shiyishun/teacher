import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the RedditData provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class RedditData {
  // const
  hurl=' http://localhost:8080';
 // hurl = 'http://868179d8.ngrok.io';

  constructor(public http: Http) {
    console.log('Hello SignInData Provider');
  }

  login(loginName, password) {
    let url = this.hurl + '/xsdk/app/teacher/login?loginName=' + loginName + '&password=' + password;
    return this.http.get(url).map(res => res.json());
  }

  logout(token) {
    let url = this.hurl + '/xsdk/app/teacher/logout?token=' + token;
    return this.http.get(url).map(res => res.json());
  }

  getCourseList(token) {
    let url = this.hurl + '/xsdk/app/teacher/course_list?token=' + token;
    return this.http.get(url).map(res => res.json());
  }

  getPersonalCourseList(token) {
    let url = this.hurl + '/xsdk/app/teacher/personal_course_list?token=' + token;
    return this.http.get(url).map(res => res.json());
  }


  getMarkList(courseId, token) {
    let url = this.hurl + '/xsdk/app/teacher/mark_list?courseId=' + courseId+'&token='+token;
    return this.http.get(url).map(res => res.json());
  }

  getMark(markId) {
    let url = this.hurl + '/xsdk/app/teacher/get_mark?markId=' + markId;
    return this.http.get(url).map(res => res.json());
  }

  editMark(markId,dailyScore,finalScore) {
    let url = this.hurl + '/xsdk/app/teacher/edit_mark?markId=' + markId+"&dailyScore="+dailyScore+"&finalScore="+finalScore;
    return this.http.get(url).map(res => res.json());
  }
  freshMarkList(courseId) {
    let url = this.hurl + '/xsdk/app/teacher/fresh_mark_list?courseId=' + courseId;
    return this.http.get(url).map(res => res.json());
  }


 editCourse(courseId,courseName,dailyWeight,finalWeight,picketLine,classDate,classOrder){
    let url = this.hurl + '/xsdk/app/teacher/edit_course?courseId='+courseId+
      '&dailyWeight='+dailyWeight+'&finalWeight='+finalWeight+'&picketLine='+picketLine+'&classDate='+classDate+
      '&classOrder='+classOrder;
    return this.http.get(url).map(res => res.json());
  }

  getCourse(courseId){
    let url = this.hurl + '/xsdk/app/teacher/get_course?courseId='+courseId;
    return this.http.get(url).map(res => res.json());
  }

  getCourseTimeList(courseId){
    let url = this.hurl + '/xsdk/app/teacher/course_time_list?courseId='+courseId;
    return this.http.get(url).map(res => res.json());
  }

  getCallTherollList(courseId, courseTimeId, callOrder){
    let url = this.hurl + '/xsdk/app/teacher/call_theroll_list?courseId='+courseId
      +"&courseTimeId="+courseTimeId+"&callOrder="+callOrder;
    return this.http.get(url).map(res => res.json());
  }

  createSignin(courseId, courseTimeId, callOrder){
    let url = this.hurl + '/xsdk/app/teacher/create_signin?courseId='+courseId
      +"&courseTimeId="+courseTimeId+"&callOrder="+callOrder;
    return this.http.get(url).map(res => res.json());
  }

  getCallTherollCount(token) {
    let url = this.hurl + '/xsdk/app/teacher/call_theroll_count?token=' + token;
    return this.http.get(url).map(res => res.json());
  }


  getStudentList(courseId, courseTimeId){
    let url = this.hurl + '/xsdk/app/teacher/student_list?courseId='+courseId
      +"&courseTimeId="+courseTimeId;
    return this.http.get(url).map(res => res.json());
  }



  getJsonData() {
    let url = this.hurl + '/shhTest/personnelaction/getAllPersonnelHql';
    return this.http.get(url).map(res => res.json());
  }



  postLogin(id, password) {
    let url = this.hurl + '/shhTest/personnelaction/CheckPersonnel?id=' + id + '&password=' + password;
    return this.http.get(url).map(res => res.json());
  }

  getPersonById(id) {
    let url = this.hurl + '/shhTest/personnelaction/getPersonnelByID?id=' + id;
    return this.http.get(url).map(res => res.json());
  }
  getCallTheRollByID(id) {
    let url = this.hurl + '/shhTest/calltherollaction/getCallTheRollByID?id=' + id;
    return this.http.get(url).map(res => res.json());
  }
  getCallTheRollByIDAndCoursename1(id,coursename){
    let url = this.hurl + '/shhTest/calltherollaction/getCallTheRollByIDAndCoursenameHql?id='+id+'&coursename=' + coursename;
    return this.http.get(url).map(res => res.json());
  }
  getCallTheRollBetweenDateHql(bcalldate,acalldate)
  {
    let url=this.hurl+'/shhTest/calltherollaction/getCallTheRollBetweenDateHql?bcalldate='+bcalldate+'&acalldate='+acalldate;
    return this.http.get(url).map(res=>res.json());
  }
  getCourseByNameHql(coursrname) {
    let url = this.hurl + '/shhTest/courseaction/getCourseByName?coursename=' +coursrname;
    return this.http.get(url).map(res => res.json());
  }
  getAllCourseHql() {
    let url = this.hurl + '/shhTest/courseaction/getAllPersonnelHql';
    return this.http.get(url).map(res => res.json());
  }
  updateCourse(oldcoursename,coursename,dailyweight,finalweight,picketline,classsession,classlocation,classdate,classorder,id,shape){

let url=this.hurl+'/shhTest/courseaction/updateCourse?oldcoursename='+oldcoursename+'&coursename='+coursename+'&dailyweight='+dailyweight+'&finalweight='+finalweight+'&picketline='+picketline+'&classsession='+classsession+'&classlocation='+classlocation+'&classdate='+classdate+'&classorder='+classorder+'&id='+id+'&shape='+shape;
    return this.http.get(url).map(res => res.json());
  }
  getMarkByName(courseName){
    let url=this.hurl+'/shhTest/markaction/getMarkByName?courseName='+courseName;
    return this.http.get(url).map(res => res.json());
  }
  updateMark(id,courseName,dailyScore,finalScore){
    let url=this.hurl+'/shhTest/markaction/updateMark?id='+id+'&courseName='+courseName+'&dailyScore='+dailyScore+'&finalScore='+finalScore;
    return this.http.get(url).map(res => res.json());
  }
  getMarkByNameAndID(id,courseName){
    let url=this.hurl+'/shhTest/markaction/getMarkByNameAndID?id='+id+'&courseName='+courseName;
    return this.http.get(url).map(res => res.json());
  }
  countAllCallTheRoll(coursename){
    let url=this.hurl+'/shhTest/calltherollaction/countAllCallTheRoll?coursename='+coursename;
    return this.http.get(url).map(res => res.json());
  }
  callOverByCoursenameAndDate(coursename){
    let url=this.hurl+'/shhTest/calltherollaction/callOverByCoursenameAndDate?coursename='+coursename;
    return this.http.get(url).map(res => res.json());
  }
  createQuestion(score,ID,courseName){
    let url=this.hurl+'/shhTest/questionaction/createQuestion?score='+score+'&ID='+ID+'&courseName='+courseName;
    return this.http.get(url).map(res => res.json());
  }
  updateCallTheRoll(autoid,callstate,coursename,calldate,callposition,id){
    let url=this.hurl+'/shhTest/calltherollaction/updateCallTheRoll?autoid='+autoid+'&callstate='+callstate+'&calldate='+calldate+'&callposition='+callposition+'&coursename='+coursename+'&id='+id;
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }
  updateCallTheRollHH(){
    let url=this.hurl+'/shhTest/calltherollaction/updateCallTheRoll?autoid=0&callstate=1&calldate=2017-06-29&callposition=5*2&coursename=电子技术&id=160327101';
    return this.http.get(url).map(res => res.json());
  }
  getCallTheRollBetweenDateAndCoursename(bcalldate,acalldate,coursename)
  {
    let url=this.hurl+'/shhTest/calltherollaction/getCallTheRollBetweenDateAndCoursename?bcalldate='+bcalldate+'&acalldate='+acalldate+"&coursename="+coursename;
    return this.http.get(url).map(res=>res.json());
  }
  getCourseByIDHql(id){
    let url=this.hurl+'/shhTest/courseaction/getCourseByIDHql?id='+id;
    return this.http.get(url).map(res => res.json());
  }
  getPersonnelByID(id){
    let url=this.hurl+'/shhTest/personnelaction/getPersonnelByID?id='+id;
    return this.http.get(url).map(res => res.json());
  }
  }
