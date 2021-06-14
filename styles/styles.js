import { Dimensions, StyleSheet} from 'react-native';

const ScreenWidth = Dimensions.get("window").width
const ScreenHeigth = Dimensions.get("window").height

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    singlebutton:{
        margin:2
    },
    textcenter:{
        textAlign:'center',
        marginHorizontal:16
    },
    separator:{
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    loadingModal:{
      height:100,
      width:200,
      backgroundColor:"#fff",
      borderColor:"#00a680",
      borderWidth:2,
      borderRadius:10,
      alignSelf:"center",
      alignItems:"center"
    },
    loadingView:{
      flex:1,
      justifyContent:"center",
    },
    loadingText:{
      color:"#00a680",
      textTransform:"uppercase",
      marginTop:10
    },
    objectViewBody:{
      flex:1,
      backgroundColor:"#fff"
    },
    objectTitle:{
      fontSize:20,
      fontWeight:"bold"
    },
    objectDescription:{
      marginTop:5,
      color:"grey"
    },
    objectInfo:{
      margin:15,
      marginTop:25
    },
    objectInfoTitle:{
      fontSize:20,
      fontWeight:"bold",
      marginBottom:10
    },
    objectImage:{
      width:ScreenWidth,
      height: 250, 
      marginBottom: 15
    },
    container: {
      position: 'absolute',
      alignContent: 'flex-end'
    },
    button: {
      right: 10,
      position: 'absolute', 
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
      alignItems: 'center',
      justifyContent: 'center',
      shadowRadius: 20,
      shadowColor: '#6074BF',
      shadowOpacity: 0.4,
      shadowOffset: { height:0 , width: 0}
    },
    menu:{
      backgroundColor: '#40AEFF',
    },
    second:{
      right: 15,
      width: 48,
      height: 48,
      borderRadius: 48/2,
      backgroundColor: '#FFF'
    }
});

export default styles