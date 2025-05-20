const axios = require("axios");
const ahriConfig = require('../config');
const crypto = require('crypto');
//roomId 및 사용자Id로 쓰일 예정
function generateUUID() {
    return crypto.randomUUID();
}

function mkSectorId(){
    return 'sector_web';
}

function mkStoragePath(sectorId){
    return sectorId
}

const openSector = async (sectorId,storagePath) => {
    console.log('roomService.openSector');


   const response = await axios.post(`${ahriConfig.ahriConfig.apiUrl}/web/openSector`,{
        sectorId :sectorId,
        storagePath : storagePath,
    },{
        headers:{'Content-Type' : 'application/json'}
    });

   return response
}
module.exports = { generateUUID, mkSectorId, mkStoragePath, openSector };