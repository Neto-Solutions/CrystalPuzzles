import './App.css';
import React from 'react';
import './css/checkin_forms/Checkin_forms.css';
import './css/checkin_forms/Checkin_header.css';
import Registration_page from './pages/Registration_page_dir/Registration_page';
import Login_page from './pages/Login_page_dir/Login_page';
import Confidence_page from './pages/Confidence_politic_page_dir/Confidence_page';
import Registration_student_page from './pages/Registration_student_page_dir/Registration_student_page';
import General_methodist_page from './pages/General_page_desctop_dir/General_methodist_page';
import Analytic_meth_page from './pages/Analytics_met_page_dir/Analytic_met_page';
import Shedule_prog_met_page from './pages/Shedule_progress_met_dir/Shedule_prog_met_page';
import Timetable_met_page from './pages/Timetable_met_dir/Timetable_met_page';
import Feedback_met_page from './pages/Feedback_met_dir/Feedback_met_page';
import Effective_table_met_page from './pages/Effectiv_table_met_dir/Effective_table_met_page';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Analytic_specific_meth_page from './pages/Analytics_met_specific_page_dir/Analytic_specific_met_page.js'
import Methodist_shedule_progress_page from './pages/Methodist_shedule_progress_page_dir/Methodist_shedule_progress_page.js'

function App()  {
    return (
      <Router>
        
        <div className="App">
        
          <Switch>
          <Methodist_shedule_progress_page/>
            <Route exact path="/">
              <General_methodist_page/>
            </Route>
            <Route exact path="/login">
              <Login_page/>
            </Route>
            <Route exact path="/registration">
              <Registration_page/>
            </Route>
            <Route exact path="/shedule_progress">
              <Shedule_prog_met_page/>
            </Route>
            <Route exact path="/timetable_methodist">
              <Timetable_met_page/>
            </Route>
            
            <Route exact path="/analytic">
              <Analytic_meth_page/>
            </Route>
            <Route exact path="/confidence">
              <Confidence_page/>
            </Route>
          </Switch>
          
        </div>  
      </Router>
      
    )
}


export default App;
