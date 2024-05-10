function Button(props){
    return(
            <button onClick={()=>props.calculate(props.text)}>{props.text}</button>
    )
}

export default Button;