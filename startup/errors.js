
module.exports = () =>{
    process.on('uncaughtException',( ex )=>{
        console.log('handle exception');
        console.log(ex.message);
    });
    process.on('uncaughtRejection',( ex )=>{
        //console.log('handle rejecgion',ex.message);
        throw(ex);
    })
}
