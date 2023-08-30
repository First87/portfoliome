import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

const App=()=>{

    return(
        
        <div className="container">
            <NavbarComponent/>
            <br />
            <section id="home" >
      <div class="container">
        <div class="grid-cols-2">
          <div class="grid-item-1">
            <h1 class="main-heading">
              Welcome to <span>DevBotX</span>
              
            </h1>
            <p class="info-text">
             Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <div class="btn_wrapper">
              <button class="btn bt view_more_btn">
                view all Portfolio <i class="ri-arrow-right-line"></i>
              </button>

              <button class="btn documentation_btn">documentation</button>
            </div>
          </div>
          <div class="grid-item-2">
            <div class="team_img_wrapper">
            <img src="http://127.0.0.1:5500/img/cat.svg" alt="W3Schools.com"/>
            </div>
          </div>
        </div>
      </div>
    </section>
            <FooterComponent/>
            
        </div>
    )
}
export default App