import SymptomForm from "../components/SymptomForm"

const centeredDivStyle = {
    width: "50%",
    paddingTop: "20px",
    margin: "0 auto"
}

export default function Home(){
    return(
        <>
        <div style={centeredDivStyle}>
            <h3>Home</h3>
        </div>
        <SymptomForm />
        </>
        
    )
}