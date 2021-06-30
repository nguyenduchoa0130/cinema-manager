export const numberWithCommas = (number)=>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const getIdVideo = (url)=>{
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : false ;
}