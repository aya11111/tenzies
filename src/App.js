import React from "react";
import Top from "./Top";
import Die from "./Die";
import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = React.useState(random());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(()=>{
    const allHeld = dice.every((el)=>el.isHeld);
    const firstValue = dice[0].value;
    const allValues = dice.every((el)=>el.value === firstValue);
    if (allHeld && allValues) {
      setTenzies(true)
      console.log("you won")
    }
  },[dice])

  function random(){
    let arr=[]
    for(let i=0; i<10; i++){
      arr.push({value: Math.ceil(Math.random()*6), isHeld: false, id: i+1})
    }

    return arr;
  }

  function holdDice(id){
    setDice(prevData => prevData.map((ele)=>{
        return ele.id === id? {...ele, isHeld: !ele.isHeld} : ele
      })
    )
  }

  let dieElement = dice.map((el) => {
    return (
      <Die value={el.value} key={el.id} isHeld={el.isHeld} func={()=>holdDice(el.id)}/>
    )
  
})

function changeNum(){
  if(!tenzies){
    setDice(prevData => prevData.map(el => {
      return el.isHeld? el : {value: Math.ceil(Math.random()*6), isHeld: false, id: el.id}
    }))
  } else {
    setTenzies(false);
    setDice(random())
  }
  
}

  return (
    <>
      <Top />
      <div className="main">
        <div className="container">
          {dieElement}
        </div>
      </div>
      <div className="but-cont">
        <button onClick={changeNum}>{tenzies?"New Game":"Roll"}</button>
      </div>
      {tenzies && <Confetti/>}
    </>
  );
}

export default App;
