import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    singlebutton:{
        margin:"2px"
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
    }
});

export default styles