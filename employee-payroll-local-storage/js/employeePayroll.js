class EmployeePayroll {
  constructor(){this._name="";this._profilePic="";this._gender="";this._department="";this._salary=0;this._startDate="";this._benefits=[];this._notes="";}
  get name(){return this._name} set name(v){this._name=v}
  get profilePic(){return this._profilePic} set profilePic(v){this._profilePic=v}
  get gender(){return this._gender} set gender(v){this._gender=v}
  get department(){return this._department} set department(v){this._department=v}
  get salary(){return this._salary} set salary(v){this._salary=v}
  get startDate(){return this._startDate} set startDate(v){this._startDate=v}
  get benefits(){return this._benefits} set benefits(v){this._benefits=v}
  get notes(){return this._notes} set notes(v){this._notes=v}
}
