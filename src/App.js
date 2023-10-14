import logo from './lgoo cafam.png';
import './fonts/BREAKERSW00-REGULAR.TTF';
import './App.css';
import { Wheel } from 'react-custom-roulette';
import React, {useState} from "react"
import riveIcons from './1714-4322-rives-animated-emojis.riv';
import riveEmojis from './1302-2493-animated-emoji-pack.riv';
import Rive from '@rive-app/react-canvas';

const premios = [
  {index: 0, name : "Vuelve a intentarlo", name_short:"Vuelve a intentarlo", cant: -1},
  {index: 1, name : "Esfero", name_short:"Esfero", cant: 10},
  {index: 2, name : "Gorra", name_short:"Gorra", cant: 12},
  {index: 3, name : "Agenda", name_short:"Agenda", cant: 12},
  {index: 4, name : "Botilito", name_short:"Botilito", cant: 12},
  {index: 5, name : "Tula", name_short:"Tula", cant: 12},
  {index: 6, name : "Entrada a teatro Cafam", name_short:"Entrada Teatro Cafam", cant: 12},
  {index: 7, name : "Pasadia Centro Vacacional Cafam Melgar", name_short:"Pasadia Cafam Melgar", cant: 0},
]
const data = []
premios.forEach(premio => {
  //let premioShortName = premio.name;
  //if(premioShortName.length > 25) premioShortName = premioShortName.substring(0,25) + "...";
  data.push({ option: premio.name_short });
});

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showresult, setShowResult] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [inventary, setInventary] = useState(premios);

  const handleConfigClick = () =>{
    setShowConfig(!showConfig);
  } 
  const handleSpinClick = () => {
    var productosDisponibles = inventary.filter((item) => {
      if(item.cant > 0 || item.cant === -1) return item;
    });
    console.log(productosDisponibles);
    const newPrizeNumber = productosDisponibles[Math.floor(Math.random() * productosDisponibles.length)].index;
    //const newPrizeNumber = 0;
    setPrizeNumber(newPrizeNumber);
    var newInventary = inventary.map((item, itemIndex) => {
      if(itemIndex === newPrizeNumber && item.cant > 0){
        item.cant --;
      }
      return item;
    });
    //setInventary(newInventary);
    setInventary(newInventary);

    setMustSpin(true);
    setShowResult(false);
  };
  const restartGame = () => {
    setShowResult(false);
  };
  
  const handleChangeInvetary = (e) =>{
    var newInventary = inventary.map((item, itemIndex) => {
      if(itemIndex === parseInt(e.target.getAttribute('data-id'))){
        item.cant = e.target.value
      }
      return item;
    });
    //setInventary(newInventary);
    setInventary(newInventary);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt=""/>
        ¡Participa en la Ruleta Ganadora!
      </header>
      <div className='App-content'>
        {!showresult && !showConfig ? 
          <>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              backgroundColors={['#214B9B', '#bc5804', '#b10807', '#09979a', '#bacf02', '#4d0089', '#890088', '#28ac05']}
              textColors={['#ffffff']}
              outerBorderColor={["#ccc"]}
              outerBorderWidth={[10]}
              innerBorderColor={["#ccc"]}
              radiusLineColor={["#ccc"]}
              radiusLineWidth={[5]}
              fontSize={[10]}
              onStopSpinning={() => {
                setMustSpin(false);
                setShowResult(true);
              }}
            />
            {!mustSpin ? <div className='buttonsRuleta'><button onClick={handleSpinClick} className="boton-ferrenovo space20"  disabled={inventary.filter((item) => item.cant > 0).length <= 0}>GIRAR LA RULETA</button> <button onClick={handleConfigClick} className="boton-ferrenovo space20">Inventario</button></div>  : <></>}
            
          </>: 
          showConfig ? 
          <>
          <form action="post">
            <table className='inventario'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              
              <tbody>
                {inventary.map((product, productIndex) =>
                  {
                    return (
                      product.cant > -1 ? 
                      <tr key={"product-"+productIndex}>
                        <td>{product.name}</td>
                        <td><input type="number" name={"product-"+productIndex} id={"product-"+productIndex} data-id={productIndex} value={product.cant} onChange={handleChangeInvetary}/></td>
                      </tr>
                      :<></>

                    )
                  }
                )}
              </tbody>
              
            </table>
          </form>
          <button onClick={handleConfigClick} className="boton-ferrenovo space20">Cerrar</button>
          </> : 
          <>
          {premios[prizeNumber].cant === -1 ?
            <Rive src={riveEmojis} artboard="Crying" animations= "Animation 1" className='iconoAnimado'/> 
            : <Rive src={riveIcons} artboard="Tada" animations="Dart_board_play" className='iconoAnimado'/>
          }
          {premios[prizeNumber].cant === -1 ? <p className='ganasteText'>Lo sentimos</p> : <p className='ganasteText'>¡Felicitaciones!<br></br>Ganaste:</p>}
          <p className='productName'>{premios[prizeNumber].name}</p>
          <button onClick={restartGame} className="boton-ferrenovo">CONTINUAR</button></>}
      
        
      </div>
    </div>
  );
}

export default App;
