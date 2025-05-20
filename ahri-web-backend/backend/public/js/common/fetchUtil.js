//-------------------------------------------------------------------------------------------------------------------------------
//          _                   _       _           _                _                                 _                    _
//         / /\                / /\    / /\        /\ \             /\ \                              / /\                 /\ \
//        / /  \              / / /   / / /       /  \ \            \ \ \                            / /  \                \ \ \
//       / / /\ \            / /_/   / / /       / /\ \ \           /\ \_\                          / / /\ \               /\ \_\
//      / / /\ \ \          / /\ \__/ / /       / / /\ \_\         / /\/_/                         / / /\ \ \             / /\/_/
//     / / /  \ \ \        / /\ \___\/ /       / / /_/ / /        / / /                           / / /  \ \ \           / / /
//    / / /___/ /\ \      / / /\/___/ /       / / /__\/ /        / / /                           / / /___/ /\ \         / / /
//   / / /_____/ /\ \    / / /   / / /       / / /_____/        / / /                           / / /_____/ /\ \       / / /
//  / /_________/\ \ \  / / /   / / /       / / /\ \ \      ___/ / /__      ________________   / /_________/\ \ \  ___/ / /__
// / / /_       __\ \_\/ / /   / / /       / / /  \ \ \    /\__\/_/___\    /______________\ \ / / /_       __\ \_\/\__\/_/___\
// \_\___\     /____/_/\/_/    \/_/        \/_/    \_\/    \/_________/    \_______________\/ \_\___\     /____/_/\/_________/
//-------------------------------------------------------------------------------------------------------------------------------

const fetchUtils = {
    // ----------------------------------------------------------------------------
    // postFetch (url, data)
    //  주어진 URL에 POST 요청을 보내고 응답을 JSON 형식으로 반환하는 함수이다.
    //  url  : 요청을 보낼 URL (String)
    //  data : 전송할 데이터 (Object)
    //  [RETURN] : JSON 응답 데이터 (Object)
    // ----------------------------------------------------------------------------
    postFetch : async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, // C 대문자!
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`❌ 서버 응답 오류: ${response.status} ${response.statusText}`);
                console.error(`❌ 응답 내용: ${errorText}`);
                return null;
            }

            return await response.json(); // ✅ JSON 파싱 반환
        } catch(error) {
            console.error(`❌ Fetch 요청 실패: ${url}`);
            console.error(error);
            return null;
        }
    },
    // ----------------------------------------------------------------------------
    // getFetch (url, data)
    //  주어진 URL에 GET 요청을 보내고 응답을 JSON 형식으로 반환하는 함수이다.
    //  url  : 요청을 보낼 URL (String)
    //  data : 요청에 추가할 쿼리 매개변수 (Object, Optional)
    //  [RETURN] : JSON 응답 데이터 (Object)
    // ----------------------------------------------------------------------------
    getFetch: async (url, data = {}) => {
        try {
            const queryString = new URLSearchParams(data).toString();
            const fullUrl = queryString ? `${url}?${queryString}` : url;

            const response = await fetch(fullUrl, {
                method: 'GET'
            });

            return response.json(); // 응답을 JSON으로 파싱하여 반환
        } catch (error) {
            errorHandler.logError(error, url);
        }
    },
    // ----------------------------------------------------------------------------
    // fileFetch (url, formData)
    //  주어진 URL로 파일을 포함한 FormData를 전송하는 함수이다.
    //  url      : 파일을 업로드할 URL (String)
    //  formData : 업로드할 파일과 데이터를 포함한 FormData 객체 (FormData)
    //  [RETURN] : JSON 응답 데이터 (Object)
    // ----------------------------------------------------------------------------
    fileFetch: async (url, formData) => {
        console.log([...formData]);
        try {
            const response = await fetch(url, {
                method: 'POST', // 파일 업로드는 일반적으로 POST 방식 사용
                body: formData, // FormData 객체 전송
            });

            return await response.json(); // JSON 응답을 반환
        } catch (error) {
            errorHandler.logError(error, url);
        }
    }
}
