import SymptomForm from "../components/SymptomForm"

const centeredDivStyle = {
    paddingTop: "20px",
    margin: "0 auto"
}

export default function Home(){
    return(
        <div style={centeredDivStyle}>
            <h3></h3>
            <SymptomForm />
        </div>        
    )
}