import './App.css';
import React from 'react';
import Registration_page from './pages/Registration_page_dir/Registration_page';
import Login_page from './pages/Login_page_dir/Login_page';
import './css/checkin_forms/Checkin_forms.css';
import './css/checkin_forms/Checkin_header.css';
import Confident_page from './pages/Confident_politic_page_dir/Confident_page'
import Registration_student_page from './pages/Registration_student_page_dir/Registration_student_page'
 

function App()  {
    return (
      <div className="App">
        <Registration_page/>
        <Registration_student_page/>
        <Login_page/>
        <Confident_page/>
      </div>
    )
}


export default App;
