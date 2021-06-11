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
    }

});

export default styles