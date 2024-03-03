import './App.css';
import React from 'react';
import './css/checkin_forms/Checkin_forms.css';
import './css/checkin_forms/Checkin_header.css';
import './css/general_page_methodist/General_methodist_page.css';
import Registration_page from './pages/Registration_page_dir/Registration_page';
import Login_page from './pages/Login_page_dir/Login_page';
import Confident_page from './pages/Confident_politic_page_dir/Confident_page'
import Registration_student_page from './pages/Registration_student_page_dir/Registration_student_page'
import General_methodist_page from './pages/General_page_desctop_dir/General_methodist_page'

function App()  {
    return (
      <div className="App">
        <General_methodist_page/>
      </div>
    )
}


export default App;
