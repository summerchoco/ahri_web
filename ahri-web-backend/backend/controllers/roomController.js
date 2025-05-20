const roomService = require('../services/roomService');
const asyncHandler = require('../common/error/asyncHandler');
// =============================================================================
// createSector (function, async)
// 서버가 시작될 때 섹터를 열어줌
//    [RETURN]   : None
// =============================================================================
const createSector = async () => {
    console.log('roomController.createSector');
    // -------------------------------------------------------------------------
    // 1. sectorId와 storagePath을 설정
    // -------------------------------------------------------------------------
    const sectorId = await roomService.mkSectorId();
    const storagePath = await roomService.mkStoragePath(sectorId);
    // -------------------------------------------------------------------------
    // 2. sector를 열어준다.
    // -------------------------------------------------------------------------
    const response = await roomService.openSector(sectorId,storagePath);

    if (response.statusText ==='OK'){
        console.log(response.data.message);
    }
}

module.exports={createSector}