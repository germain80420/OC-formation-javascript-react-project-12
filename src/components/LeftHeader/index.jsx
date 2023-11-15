import imgYoga from "../../assets/yoga.svg"
import imgNatation from "../../assets/natation.svg"
import imgVelo from "../../assets/velo.png"
import imgAltere from "../../assets/altere.png"
import "../../styles/LeftHeader.css"

function LeftHeader(){
    return(
            <div className="left-side">
                <div className="left-border">
                    <div className="container-btns">
                        <img className="btns" src={imgYoga} alt="icone Yoga" />
                        <img className="btns" src={imgNatation} alt="icone Natation" />
                        <img className="btns" src={imgVelo} alt="icone Velo" />
                        <img className="btns" src={imgAltere} alt="icone Altere" />  
                    </div>
                    <div className="copyright">
                        <p>Copyright, SportSee 2023</p>
                    </div>
                </div>
            </div>
    )
}
export default LeftHeader