import React, { useEffect, useState } from "react";
import "./basics.css"
import "./specific.css"

export const Ternary = ()=>{

    const [x,updateX]=useState(2)
    const [text,updateText]=useState("a")
    
    //let handleInput = (event)=>{
    //    updateText(event.target.value)
    //}

    return(
        <div>
            <div 
            className="borderGreen flexDisp"
            style={{
                alignItems:"center",
                textAlign:"center"
                
            }}>

                    <button onClick={()=>{updateX(x-1)}}>
                        -
                    </button>
                <div className="borderBlue">
                    <span className="coolText1">
                        Hello World! <br/>
                        {x}===2 <br/>
                        {
                            x===2
                            ? <span>
                                Yes that's true
                            </span>
                            : <span>
                                No it's not true
                            </span>
                        } <br/>
                        {
                        x!==10
                        ? <span>
                            ok
                        </span>
                        :<span>
                            wat
                        </span>
                        }
                    </span>
                    <br/>
                    <button onClick={()=>{updateX(2)}}>
                    reset
                    </button>
                </div>
                    <button onClick={()=>{updateX(x+1)}}>
                        +
                    </button>
                <div className="borderRed">
                    <input 
                    onChange={(event)=>{
                        updateText(event.target.value)
                    }}
                    value={text}
                    /> 
                </div>
            </div>

        </div>
    )
}

export const Magician = () =>{
    let redMage="https://lolfanatics.com/wp-content/uploads/2021/12/Siege-Minions.png"
    let blueMage="https://www.seekpng.com/png/full/151-1516147_blue-cannon-league-of-legends-minion-toy.png"
    let explosion="https://png2png.com/wp-content/uploads/2021/07/explosion-png.png"
    const [hpBlue,blueUpdate]=useState(100)
    const [hpRed,redUpdate]=useState(110)
    
    let hitBlue = () => {
        if (hpBlue>0){
            blueUpdate(hpBlue-(10*(xp**(1/2))))
            HitUP(1)
        }
    }

    let hitRed = () =>{
        if (hpRed>0 && hpRed<=(100+10*xp)){
            redUpdate(hpRed-10)
            showUP(showImage+1)
        }
    }

    let gainBlue =()=>{
        if (hpBlue>0&&hpBlue<=(100*xp)){
            blueUpdate(hpBlue+xp)
        }
    }

    let gainRed =()=>{
        if (hpRed>0 && hpRed<(80+5*xp)){ ///Need to fix the code in other parts in order not to glitch when hpRed is too much
            redUpdate(hpRed+10*(xp**(1/2)))
        }
    }

    const [fighting,fightingUpdate]=useState(false)
    const [timerFire,fireUpdate]=useState(true)
    const [xp,gainXP]=useState(1)
    const [bugFire,bugUpdate]=useState(1)
    const [showImage,showUP]=useState(-1)
    const [showImageOnHit,HitUP]=useState(0)

    useEffect(()=>{
        if(fighting&&hpRed>0&&hpBlue>0){
            let timer=setInterval(()=>{
                bugUpdate(bugFire+1+(xp/4.5))
            },10)
            return()=>{
                clearInterval(timer)
            }}
    })
    useEffect(()=>{
        if(bugFire>=78){
            fireUpdate(!timerFire)
            bugUpdate(0)
            }
            })




///On the useEffect above there is a bug that if you
///update and Hooks, it rerenders and if the timer is
///let's say 1 sec (the person clicks beore rendering again)
///then it doesn't update the timerFire


    useEffect(()=>{
        let timer2=setInterval(()=>{
            showUP(0)
        },75)
        return()=>{clearInterval(timer2)}
        ///wrote the function inside the parenethesis of return
        //and code was not working :"")) happy debugging
        },[hpRed])

    useEffect(()=>{
        let timer2=setInterval(()=>{
            HitUP(0)
        },75)
        return()=>{clearInterval(timer2)}
        ///wrote the function inside the parenethesis of return
        //and code was not working :"")) happy debugging
        },[showImageOnHit])

    useEffect(
        ()=>{
            gainBlue()
            hitRed()
        },[timerFire])


    return(
        <div 
        className=""
        style={{textAlign:"center"}}
        >
        <div>
            <button onClick={()=>{fightingUpdate(true)}}>START FIGHT</button>
        </div>
        <div className=" flexDisp " style={{justifyContent:"center", gap:"90px"}}>
                <div>

                    <img src={redMage} 
                    alt="red mage"
                    width="200px"
                    height="200px"
                    className="mirrorImage"
                    />
                    {
                        showImage===1&&
                        <img src={explosion} 
                        alt="explosion" 
                        width="200px" 
                        height="200px" 
                        style={{
                            zIndex:"2",
                            position:"absolute",
                            marginLeft:"-200px"
                            
                        }} 
                        />
                    
                    }
                    <br/>

                    <p>{
                    hpRed>0
                    ?"hp: "+hpRed
                    :"DEAD"
                    }</p>
                </div>
                <div>

                    <img src={blueMage} 
                    alt="blue mage" 
                    width="200px" 
                    height="200px"/>
                    
                    {
                        (showImageOnHit===1)&&
                        <img src={explosion} 
                        alt="explosion" 
                        width="200px" 
                        height="200px" 
                        style={{
                            zIndex:"2",
                            position:"absolute",
                            marginLeft:"-200px"
                            
                        }} 
                        />
                    }
                    <p> {
                    hpBlue>0
                    ?"hp: "+hpBlue
                    :"DEAD"
                    }</p>
                </div>
            </div>
            <div className="">
                <button
                onClick={
                    (hpRed>0&&fighting)&&
                    hitBlue
                    }>
                    HIT
                </button>
                <button
                onClick={fighting&&gainRed}>
                    REGEN
                </button>
                {//<span>
   //                 {""+timerFire}
 //               </span>
}
                <br/>
                {hpRed<=0&&
                <button onClick={()=>{
                    redUpdate(100)
                    blueUpdate(100)
                    fightingUpdate(false)
                    gainXP(1)}}>
                    Revive (you lose progress)
                    
                </button>}

                {hpBlue<=0&&
                <button onClick={()=>{
                    blueUpdate(100*xp)
                    gainXP(xp+1)
                    }}>
                    Steal XP and summon new enemy    
                </button>
                }
                <br/>
                <span>xp: {xp-1}</span>
                <br/>
                {//<span>show image: {""+showImage}</span>
    //            <br/>
 ///               <span>on hit: {""+showImageOnHit}</span>
}
                </div>
        </div>
    )
}