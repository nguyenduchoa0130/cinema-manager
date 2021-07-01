/* eslint-disable no-useless-escape */
export const numberWithCommas = (number)=>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const getIdVideo = (url)=>{
    const link = ''+ url;
    url = link.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
   return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}