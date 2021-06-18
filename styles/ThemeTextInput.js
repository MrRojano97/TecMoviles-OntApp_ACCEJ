import colors from "./colors";

//Objeto que permite personalizar un TextInput de Paper para que se adecue a los colores de la aplicacion.
//Se usa con la propiedad theme del text input -> <TextInput theme={themeTextInput}>... </TextInput>
const themeTextInput={
  colors:{ 
    primary: colors.blue_dark,
    underlineColor:'transparent',
   }
}
export default themeTextInput;