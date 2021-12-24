export const http = {
    httpGet: async (url: string) => {
        return fetch(url, {
            method: 'get',
            headers: { "content-type": "application/json" },
            credentials: "include"// 携带cookie
        })
    },
    httpPost: async (url: string, body: string) => {
        return fetch(url, {
            method: 'post',
            body: body,
            credentials: "include",// 携带cookie
            headers: { "content-type": "application/json" }
        })
    }
}
