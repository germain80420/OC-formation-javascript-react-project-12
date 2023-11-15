import "../../styles/KeyDataInfos.css"
function KeyDataInfos(props){
    return(
        <div className="keydata-container">
            <img src={props.img} alt="icone"/>
            <div className="keydata-infos">
                <h2>{props.amount}{props.unit}</h2>
                <p>{props.type}</p>
            </div>
        </div>
    )
}
export default KeyDataInfos