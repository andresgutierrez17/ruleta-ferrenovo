import logo from './logo.svg';
import './fonts/BREAKERSW00-REGULAR.TTF';
import './App.css';
import { Wheel } from 'react-custom-roulette';
import React, {useState} from "react"
import riveIcons from './1714-4322-rives-animated-emojis.riv';
import riveEmojis from './1302-2493-animated-emoji-pack.riv';
import Rive from '@rive-app/react-canvas';

const premios = [
  {index: 0, name : "Vuelve a intentarlo", name_short:"Vuelve a intentarlo", cant: -1},
  {index: 1, name : "Kit taladro de impacto 13MM 550Watts + Pulidora 115MM 550 Watts", name_short:"Kit taladro + Pulidora", cant: 10},
  {index: 2, name : "Kit de electricista 9pcs", name_short:"Kit de electricista", cant: 12},
  {index: 3, name : "Juego de copas ratchet 40 piezas acabado en cromo y en estuche plástico", name_short:"Juego de copas", cant: 12},
  {index: 4, name : "Juego surtido de herramientas manuales 5 piezas en estuche", name_short:"Juego de herramientas", cant: 12},
  {index: 5, name : "Gancho reutilizable Ferrenovo x 3und", name_short:"Gancho reutilizable", cant: 12},
  {index: 6, name : "Kit de reparación motocicleta, contiene 8 pcs", name_short:"Kit de motocicleta", cant: 12},
  {index: 7, name : "Juego de 6 pcs destornilladores de precisión", name_short:"Juego de destornilladores", cant: 12},
  {index: 8, name : "Vuelve a intentarlo", name_short:"Vuelve a intentarlo", cant: -1},
  {index: 9, name : "Juego de llaves hexagonales", name_short:"Juegos De Llaves", cant: 15},
  {index: 10, name : "Hombre Solo", name_short:"Hombre Solo", cant: 15},
  {index: 11, name : "Pinza Punta Larga", name_short:"Pinza Punta Larga", cant: 15},
  {index: 12, name : "Ganchos Fijos Decorativos", name_short:"Ganchos Fijos Decorativos", cant: 15},
  {index: 13, name : "Ganchos Fijos", name_short:"Ganchos Fijos", cant: 15},
  {index: 14, name : "Fieltro protector Uso Liviano", name_short:"Fieltro Protector", cant: 15},
  {index: 15, name : "Lapiceros", name_short:"Fieltro Protector", cant: 200}
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
              backgroundColors={['#0AA245', '#000000']}
              textColors={['#ffffff']}
              outerBorderColor={["#f2f2f2"]}
              outerBorderWidth={[10]}
              innerBorderColor={["#f2f2f2"]}
              radiusLineColor={["#dedede"]}
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
